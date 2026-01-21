package com.backend.auth_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.auth_service.entity.Otp;

public interface AuthRepository extends JpaRepository<Otp, String> {

}
