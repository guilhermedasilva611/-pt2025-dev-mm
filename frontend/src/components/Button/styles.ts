import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  margin-top: 2rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--primary-dark);
  }

  &:disabled {
    background-color: var(--primary);
    opacity: 0.7;
  }
`; 