package com.backend.product_service.exception;

import com.backend.product_service.dto.response.ApiResponse;

import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // Lỗi tùy chỉnh chung
        @ExceptionHandler(BaseException.class)
        public ResponseEntity<ApiResponse<Void>> handleBaseException(BaseException ex) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(ex.getStatus().value())
                                .message(ex.getMessage())
                                .errorCode(ex.getErrorCode())
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, ex.getStatus());
        }

        // Lỗi validation dữ liệu đầu vào
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
                Map<String, String> errors = new HashMap<>();
                ex.getBindingResult().getFieldErrors()
                                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

                ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
                                .success(false)
                                .status(HttpStatus.BAD_REQUEST.value())
                                .message("Dữ liệu đầu vào không hợp lệ")
                                .errorCode("ERR_VALIDATION")
                                .timestamp(LocalDateTime.now())
                                .data(errors)
                                .build();

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Lỗi về database
        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ApiResponse<Void>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
                String message = "Lỗi dữ liệu database";
                String errorCode = "ERR_DB_GENERIC";
                HttpStatus status = HttpStatus.CONFLICT;

                if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
                        String specificMessage = ex.getMostSpecificCause().getMessage();
                        if (specificMessage.contains("Duplicate entry")) {
                                message = "Dữ liệu đã tồn tại";
                                errorCode = "ERR_DUPLICATE";
                        } else if (specificMessage.contains("foreign key")) {
                                message = "Không thể thực hiện do ràng buộc dữ liệu liên quan";
                                errorCode = "ERR_FOREIGN_KEY";
                                status = HttpStatus.BAD_REQUEST;
                        }
                }

                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(status.value())
                                .message(message)
                                .errorCode(errorCode)
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, status);
        }

        @ExceptionHandler(DataAccessResourceFailureException.class)
        public ResponseEntity<ApiResponse<Void>> handleDBConnectionError(DataAccessResourceFailureException ex) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(HttpStatus.SERVICE_UNAVAILABLE.value())
                                .message("Không thể kết nối đến Database. Vui lòng thử lại sau.")
                                .errorCode("ERR_DB_CONNECTION")
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }

        // Lỗi gửi JSON sai định dạng
        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<ApiResponse<Void>> handleJsonParseError(HttpMessageNotReadableException ex) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(HttpStatus.BAD_REQUEST.value())
                                .message("JSON Body không đúng định dạng hoặc bị lỗi cú pháp")
                                .errorCode("ERR_JSON_PARSE")
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Lỗi sai kiểu dữ liệu trên URL
        @ExceptionHandler(MethodArgumentTypeMismatchException.class)
        public ResponseEntity<ApiResponse<Void>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(HttpStatus.BAD_REQUEST.value())
                                .message("Tham số '" + ex.getName() + "' sai kiểu dữ liệu. Yêu cầu: "
                                                + ex.getRequiredType().getSimpleName())
                                .errorCode("ERR_TYPE_MISMATCH")
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Lỗi sai Method HTTP
        @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
        public ResponseEntity<ApiResponse<Void>> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(HttpStatus.METHOD_NOT_ALLOWED.value())
                                .message("Method " + ex.getMethod() + " không được hỗ trợ tại endpoint này")
                                .errorCode("ERR_METHOD_NOT_SUPPORTED")
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
        }

        // Lỗi khác không lường trước
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ApiResponse<Void>> handleGlobalException(Exception ex) {
                ex.printStackTrace();

                ApiResponse<Void> response = ApiResponse.<Void>builder()
                                .success(false)
                                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                                .message("Lỗi hệ thống không mong muốn")
                                .errorCode("ERR_INTERNAL_SERVER")
                                .timestamp(LocalDateTime.now())
                                .build();
                return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}