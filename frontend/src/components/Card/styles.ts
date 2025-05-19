import styled from 'styled-components';

export const Card = styled.div`
  background-color: var(--card-background);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 32rem;
  margin: 2rem auto;

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  color: var(--text);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Section = styled.section`
  & + & {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Feedback = styled.div<{ type: 'success' | 'error' }>`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: ${({ type }) =>
    type === 'success'
      ? 'rgba(22, 163, 74, 0.1)'
      : 'rgba(220, 38, 38, 0.1)'};
  color: ${({ type }) =>
    type === 'success' ? 'var(--success)' : 'var(--error)'};
  font-size: 0.875rem;
  font-weight: 500;
`; 