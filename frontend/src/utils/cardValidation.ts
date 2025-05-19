export const getCardBrand = (cardNumber: string): 'visa' | 'mastercard' | null => {
  const number = cardNumber.replace(/\D/g, '');
  
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/
  };

  if (patterns.visa.test(number)) return 'visa';
  if (patterns.mastercard.test(number)) return 'mastercard';
  
  return null;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const number = cardNumber.replace(/\D/g, '');
  
  if (number.length < 13 || number.length > 16) return false;
  
  // Luhn Algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}; 