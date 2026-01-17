package com.backend.category_service.exception;

import org.springframework.http.HttpStatus;

public class ForeignKeyConstraintException extends BaseException {
    public ForeignKeyConstraintException(String message) {
        super(message, HttpStatus.BAD_REQUEST, "ERR_FOREIGN_KEY");
    }
}