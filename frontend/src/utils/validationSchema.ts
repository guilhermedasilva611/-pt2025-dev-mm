import * as yup from 'yup';
import { validateCardNumber } from './cardValidation';
import { unmask } from './masks';

export const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Número do cartão é obrigatório')
    .test('valid-card', 'Número do cartão inválido', (value) => {
      if (!value) return false;
      return validateCardNumber(value);
    }),
  
  cardHolder: yup
    .string()
    .required('Nome do titular é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'Nome deve conter apenas letras'),
  
  expirationDate: yup
    .string()
    .required('Data de validade é obrigatória')
    .test('valid-expiration', 'Data de validade inválida', (value) => {
      if (!value) return false;
      const [month, year] = unmask(value).match(/.{1,2}/g) || [];
      if (!month || !year) return false;
      
      const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      
      return expDate >= today;
    }),
  
  cvv: yup
    .string()
    .required('CVV é obrigatório')
    .matches(/^\d{3}$/, 'CVV deve ter 3 dígitos'),
  
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido'),
  
  birthDate: yup
    .string()
    .required('Data de nascimento é obrigatória')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Use o formato DD/MM/AAAA')
    .test('valid-age', 'Idade mínima de 18 anos', (value) => {
      if (!value) return false;
      const [day, month, year] = value.split('/');
      if (!day || !month || !year) return false;

      const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const today = new Date();
      
      // Calcula a diferença em anos
      let age = today.getFullYear() - birthDate.getFullYear();
      
      // Ajusta a idade se ainda não chegou o aniversário este ano
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18;
    })
}); 