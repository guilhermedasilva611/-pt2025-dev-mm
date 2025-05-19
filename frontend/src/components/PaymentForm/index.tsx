import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PaymentFormData, PaymentResponse } from '../../types/payment';
import { paymentSchema } from '../../utils/validationSchema';
import { submitPayment } from '../../services/api';
import { Input } from '../Input';
import { Button } from '../Button';
import * as S from '../Card/styles';
import {
  maskCard,
  maskCPF,
  maskExpirationDate,
  maskCVV,
  maskBirthDate,
} from '../../utils/masks';
import { getCardBrand } from '../../utils/cardValidation';

export const PaymentForm: React.FC = () => {
  const [feedback, setFeedback] = useState<PaymentResponse | null>(null);
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
    mode: 'onChange',
  });

  const cardNumber = watch('cardNumber');

  React.useEffect(() => {
    if (cardNumber) {
      setCardBrand(getCardBrand(cardNumber));
    }
  }, [cardNumber]);

  const onSubmit = async (data: PaymentFormData) => {
    try {
      console.log('Enviando dados:', data);
      const response = await submitPayment(data);
      console.log('Resposta do backend:', response);
      setFeedback(response);
      
      if (response.status === 'error') {
        console.error('Erro do backend:', response);
      }
    } catch (error) {
      console.error('Erro ao fazer requisição:', error);
      setFeedback({
        status: 'error',
        message: 'Erro ao processar pagamento. Tente novamente.',
      });
    }
  };

  return (
    <S.Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.Title>Dados do Cartão</S.Title>
          <S.Grid>
            <div style={{ gridColumn: '1 / -1' }}>
              <Input
                label="Número do Cartão"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                register={register}
                error={errors.cardNumber?.message}
                mask={maskCard}
                maxLength={19}
                cardBrand={cardBrand}
              />
            </div>
            <Input
              label="Nome do Titular"
              name="cardHolder"
              placeholder="Nome como está no cartão"
              register={register}
              error={errors.cardHolder?.message}
            />
            <Input
              label="Validade"
              name="expirationDate"
              placeholder="MM/AA"
              register={register}
              error={errors.expirationDate?.message}
              mask={maskExpirationDate}
              maxLength={5}
            />
            <Input
              label="CVV"
              name="cvv"
              placeholder="000"
              register={register}
              error={errors.cvv?.message}
              mask={maskCVV}
              maxLength={3}
              type="password"
            />
          </S.Grid>
        </S.Section>

        <S.Section>
          <S.Title>Informações Fiscais</S.Title>
          <S.Grid>
            <Input
              label="CPF"
              name="cpf"
              placeholder="000.000.000-00"
              register={register}
              error={errors.cpf?.message}
              mask={maskCPF}
              maxLength={14}
            />
            <Input
              label="Data de Nascimento"
              name="birthDate"
              placeholder="DD/MM/AA"
              register={register}
              error={errors.birthDate?.message}
              mask={maskBirthDate}
              maxLength={10}
            />
          </S.Grid>
        </S.Section>

        <Button type="submit" disabled={!isValid}>
          Processar
        </Button>

        {feedback && (
          <S.Feedback type={feedback.status}>
            {feedback.message}
          </S.Feedback>
        )}
      </form>
    </S.Card>
  );
}; 