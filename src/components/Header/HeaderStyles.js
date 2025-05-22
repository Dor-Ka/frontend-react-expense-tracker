import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
