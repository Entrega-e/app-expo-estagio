import styled, { css } from "styled-components/native";

const NAVBAR_LOGO = "../../../assets/entregae_branca.png";

const Navbar = () => {
  return (
    <Wrapper>
      <StyledImage source={require(NAVBAR_LOGO)} />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 120px;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 8px;
    background-color: ${theme.colors.blue200};
  `}
`;

const StyledImage = styled.Image`
  width: 300px;
  height: 60px;
  resize-mode: contain;
`;

export default Navbar;
