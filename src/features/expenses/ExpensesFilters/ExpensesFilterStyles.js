import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    gap: 0.5rem;
    justify-content: center;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;

  @media (max-width: 500px) {
    min-width: 100px;
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  @media (max-width: 500px) {
    font-size: 0.9rem;
    padding: 0.4rem;
  }
`;
