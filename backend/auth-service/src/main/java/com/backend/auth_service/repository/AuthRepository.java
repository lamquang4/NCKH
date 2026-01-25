package com.backend.auth_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.auth_service.entity.Otp;

@Repository
public interface AuthRepository extends JpaRepository<Otp, String> {

}
