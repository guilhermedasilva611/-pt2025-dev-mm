package com.payment.services;

import com.payment.dtos.PaymentRequest;
import com.payment.dtos.PaymentResponse;
import com.payment.validators.PaymentValidator;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class PaymentService {
    private final PaymentValidator validator;

    public PaymentService(PaymentValidator validator) {
        this.validator = validator;
    }

    public PaymentResponse processPayment(PaymentRequest request) {
        validator.validate(request);

        String cardBrand = detectCardBrand(request.getCardNumber());
        String transactionId = generateTransactionId();

        return PaymentResponse.builder()
                .status("success")
                .message("Pagamento processado com sucesso")
                .data(PaymentResponse.PaymentData.builder()
                        .transactionId(transactionId)
                        .cardBrand(cardBrand)
                        .build())
                .build();
    }

    private String detectCardBrand(String cardNumber) {
        String cleanNumber = cardNumber.replaceAll("\\s", "");
        
        if (Pattern.matches("^4[0-9]{12}(?:[0-9]{3})?$", cleanNumber)) {
            return "visa";
        }
        if (Pattern.matches("^5[1-5][0-9]{14}$", cleanNumber)) {
            return "mastercard";
        }
        return "unknown";
    }

    private String generateTransactionId() {
        return UUID.randomUUID().toString();
    }
} 