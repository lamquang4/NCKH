package com.backend.assistant_service.exception;

import org.springframework.http.HttpStatus;

public class ExternalServiceException extends BaseException {
    public ExternalServiceException(String message) {
        super(message, HttpStatus.BAD_GATEWAY, "ERR_EXTERNAL_API");
    }
}