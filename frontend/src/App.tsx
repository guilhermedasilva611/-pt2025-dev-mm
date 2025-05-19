import React from 'react';
import { PaymentForm } from './components/PaymentForm';
import { GlobalStyles } from './styles/globalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <PaymentForm />
    </>
  );
};

export default App; 