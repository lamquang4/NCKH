package com.backend.auth_service.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.backend.auth_service.dto.response.LoginResponse;
import com.backend.auth_service.dto.response.UserAuthResponse;
import com.backend.auth_service.exception.BadRequestException;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public LoginResponse generateLoginResponse(UserAuthResponse user) {

        String token = Jwts.builder()
                .setSubject(user.getId())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .claim("status", user.getStatus())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        return LoginResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .status(user.getStatus())
                .build();
    }

    // Lấy claims từ token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Lấy user info từ token
    public LoginResponse getLoginResponseFromToken(String token) {

        Claims claims = getClaims(token);

        Integer status = claims.get("status", Integer.class);
        if (status != null && status == 0) {
            throw new BadRequestException("Tài khoản đã bị khóa");
        }

        return LoginResponse.builder()
                .id(claims.getSubject())
                .email(claims.get("email", String.class))
                .role(claims.get("role", String.class))
                .status(status)
                .build();
    }

    // Validate token
    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaims(token);

            String userId = claims.getSubject();
            Integer status = claims.get("status", Integer.class);

            if (userId == null) {
                return false;
            }

            if (status != null && status == 0) {
                return false;
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
