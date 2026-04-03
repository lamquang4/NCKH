package com.backend.assistant_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.backend.assistant_service.dto.response.UserFullnameResponse;

@FeignClient(name = "user-service")
public interface UserServiceClient {
    @GetMapping("/api/user/internal/fullname/{id}")
    UserFullnameResponse getFullnameByIdInternal(@PathVariable("id") String id);
}
