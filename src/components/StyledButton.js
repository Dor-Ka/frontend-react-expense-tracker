import styled from "styled-components";

export const SampleButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || "#005fa3"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 500px) {
    font-size: 0.9rem;
    padding: 0.4rem 0.75rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
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
  }

  &:focus {
    outline: none;
  }
`;
