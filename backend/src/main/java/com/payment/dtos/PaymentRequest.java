package com.payment.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotBlank(message = "Número do cartão é obrigatório")
    @Pattern(regexp = "^[0-9\\s]{16,19}$", message = "Número do cartão inválido")
    private String cardNumber;

    @NotBlank(message = "Nome do titular é obrigatório")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Nome deve conter apenas letras")
    private String cardHolder;

    @NotBlank(message = "Data de validade é obrigatória")
    @Pattern(regexp = "^(0[1-9]|1[0-2])/([0-9]{2})$", message = "Data de validade inválida")
    private String expirationDate;

    @NotBlank(message = "CVV é obrigatório")
    @Pattern(regexp = "^[0-9]{3}$", message = "CVV deve ter 3 dígitos")
    private String cvv;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "^([0-9]{3}\\.?[0-9]{3}\\.?[0-9]{3}\\-?[0-9]{2})$", message = "CPF inválido")
    private String cpf;

    @NotBlank(message = "Data de nascimento é obrigatória")
    @Pattern(regexp = "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/([0-9]{4})$", message = "Data de nascimento inválida")
    private String birthDate;
} 