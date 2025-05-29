import styled from "styled-components";

const BaseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.25s ease, transform 0.1s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SampleButton = styled(BaseButton)`
  padding: 0.5rem 1rem;
  font-size: 1rem;

  @media (max-width: 500px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
  }
`;

export const SubmitButton = styled(BaseButton)`
  padding: 0.75rem;
  font-size: 1rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.danger}; 
    border-radius: 6px;
  }

  &:focus {
    outline: none;
  }
`;