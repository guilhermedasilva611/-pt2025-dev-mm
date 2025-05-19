package com.payment.exceptions;

import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {
    private final Object errors;

    public ValidationException(String message, Object errors) {
        super(message);
        this.errors = errors;
    }
} 