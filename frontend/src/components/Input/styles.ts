import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
`;

export const Label = styled.label`
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 500;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  font-size: 1rem;
  color: var(--text);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &:disabled {
    background-color: var(--background);
    cursor: not-allowed;
  }

  &.error {
    border-color: var(--error);
  }
`;

export const Error = styled.span`
  color: var(--error);
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const CardBrandIcon = styled.img`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  width: auto;
`; 