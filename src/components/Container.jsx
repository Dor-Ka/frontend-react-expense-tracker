import styled from "styled-components";

const StyledContainer = styled.main`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
