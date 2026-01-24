package com.backend.auth_service.dto.request;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {
    private String email;
    private String fullname;
    private String phone;
    private LocalDate birthDate;
    private Integer gender;
    private String password;
    private String role; // customer | admin
    private Integer status;
    private String googleId;
}
