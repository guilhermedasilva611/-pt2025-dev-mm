package com.payment.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
    private String status;
    private String message;
    private Object errors;
} 