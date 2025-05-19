import React, { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  register: UseFormRegister<any>;
  mask?: (value: string) => string;
  cardBrand?: 'visa' | 'mastercard' | null;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  error,
  register,
  mask,
  cardBrand,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      e.target.value = mask(e.target.value);
    }
  };

  return (
    <S.Container>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.InputContainer>
        <S.StyledInput
          id={name}
          className={error ? 'error' : ''}
          {...register(name)}
          onChange={(e) => {
            handleChange(e);
            register(name).onChange(e);
          }}
          {...rest}
        />
        {cardBrand && (
          <S.CardBrandIcon
            src={`/assets/${cardBrand}.svg`}
            alt={`Bandeira ${cardBrand}`}
          />
        )}
      </S.InputContainer>
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}; 