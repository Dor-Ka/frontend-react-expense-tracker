import styled from "styled-components";

export const ItemWrapper = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 1.5rem;
  border-left: 6px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  span {
    font-size: 0.875rem;
    color: #666;
  }
`;
