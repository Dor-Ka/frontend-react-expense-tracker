import styled from "styled-components";

export const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Message = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 1rem;
`;