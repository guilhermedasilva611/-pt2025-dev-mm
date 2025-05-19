package com.payment.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    private String status;
    private String message;
    private PaymentData data;

    @Data
    @Builder
    public static class PaymentData {
        private String transactionId;
        private String cardBrand;
    }
} 