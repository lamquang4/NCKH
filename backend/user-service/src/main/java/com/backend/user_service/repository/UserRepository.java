package com.backend.user_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.user_service.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
