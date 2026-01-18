package com.backend.brand_service.exception;

import org.springframework.http.HttpStatus;

public class DuplicateRecordException extends BaseException {
    public DuplicateRecordException(String message) {
        super(message, HttpStatus.CONFLICT, "ERR_DUPLICATE");
    }
}