export interface CardData {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

export interface PersonalData {
  cpf: string;
  birthDate: string;
}

export interface PaymentFormData extends CardData, PersonalData {}

export interface PaymentResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    transactionId?: string;
    cardBrand?: string;
  };
} 