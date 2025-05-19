import axios from 'axios';
import { PaymentFormData, PaymentResponse } from '../types/payment';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const submitPayment = async (data: PaymentFormData): Promise<PaymentResponse> => {
  try {
    // Garantir que os dados estão no formato correto
    const paymentData = {
      cardNumber: data.cardNumber.replace(/\s/g, ''),
      cardHolder: data.cardHolder.toUpperCase(),
      expirationDate: data.expirationDate,
      cvv: data.cvv,
      cpf: data.cpf,
      birthDate: data.birthDate
    };

    console.log('Enviando requisição para:', api.defaults.baseURL);
    console.log('Dados enviados:', paymentData);

    const response = await api.post<PaymentResponse>('/payments', paymentData);
    console.log('Resposta recebida:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro detalhado:', error);
    if (axios.isAxiosError(error)) {
      console.error('Status do erro:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      if (error.response?.data) {
        return error.response.data as PaymentResponse;
      }
      return {
        status: 'error',
        message: `Erro na requisição: ${error.message}`
      };
    }
    return {
      status: 'error',
      message: 'Erro ao processar pagamento. Tente novamente.'
    };
  }
}; 