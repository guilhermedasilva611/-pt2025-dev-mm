package com.payment.validators;

import com.payment.dtos.PaymentRequest;
import com.payment.exceptions.ValidationException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Component
public class PaymentValidator {
    public void validate(PaymentRequest request) {
        List<String> errors = new ArrayList<>();

        validateCPF(request.getCpf(), errors);
        validateAge(request.getBirthDate(), errors);
        validateCardExpiration(request.getExpirationDate(), errors);
        validateCardNumber(request.getCardNumber(), errors);

        if (!errors.isEmpty()) {
            throw new ValidationException("Erro de validação", errors);
        }
    }

    private void validateCPF(String cpf, List<String> errors) {
        String cleanCpf = cpf.replaceAll("[^0-9]", "");
        
        if (cleanCpf.length() != 11) {
            errors.add("CPF inválido");
            return;
        }

        if (Pattern.matches("(\\d)\\1{10}", cleanCpf)) {
            errors.add("CPF inválido");
        }
    }

    private void validateAge(String birthDate, List<String> errors) {
        if (!birthDate.matches("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$")) {
            errors.add("Use o formato DD/MM/AAAA");
            return;
        }

        try {
            String[] parts = birthDate.split("/");
            int day = Integer.parseInt(parts[0]);
            int month = Integer.parseInt(parts[1]);
            int year = Integer.parseInt(parts[2]);
            
            LocalDate birthDateParsed = LocalDate.of(year, month, day);
            LocalDate today = LocalDate.now();
            
            int age = Period.between(birthDateParsed, today).getYears();
            
            if (age < 18) {
                errors.add("Idade mínima de 18 anos");
            }
        } catch (Exception e) {
            errors.add("Data de nascimento inválida");
        }
    }

    private void validateCardExpiration(String expirationDate, List<String> errors) {
        try {
            String[] parts = expirationDate.split("/");
            int month = Integer.parseInt(parts[0]);
            int year = 2000 + Integer.parseInt(parts[1]);
            
            LocalDate expDate = LocalDate.of(year, month, 1);
            LocalDate now = LocalDate.now().withDayOfMonth(1);
            
            if (expDate.isBefore(now) || expDate.isEqual(now)) {
                errors.add("Cartão vencido");
            }
        } catch (Exception e) {
            errors.add("Data de validade inválida");
        }
    }

    private void validateCardNumber(String cardNumber, List<String> errors) {
        String cleanNumber = cardNumber.replaceAll("\\s", "");
        
        if (!isValidLuhn(cleanNumber)) {
            errors.add("Número do cartão inválido");
        }
    }

    private boolean isValidLuhn(String number) {
        int sum = 0;
        boolean alternate = false;
        
        for (int i = number.length() - 1; i >= 0; i--) {
            int digit = number.charAt(i) - '0';
            
            if (alternate) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            alternate = !alternate;
        }
        
        return sum % 10 == 0;
    }
} 