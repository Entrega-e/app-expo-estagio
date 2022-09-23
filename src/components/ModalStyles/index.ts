import styled, { css } from "styled-components/native";
import theme from "../../styles/theme";

export const ModalOverlay = styled.View`
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  ${({ theme }) => css`
    width: 90%;
    max-width: 300px;
    height: auto;
    padding: 16px;
    border: 2px solid #999999;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    border-radius: ${theme.radii[25]};
    background-color: ${theme.colors.white};
    z-index: 105;
  `}
`;

export const ModalContent = styled.View`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ModalButtons = styled.View`
  flex-direction: row;
  margin: 16px 0 8px;
`;

export const ButtonGreen = styled.Pressable`
  padding: 8px 12px;
  margin-left: 12px;
  background-color: ${theme.colors.green700};
  border-radius: ${theme.radii[10]};
`;

export const ButtonRed = styled.Pressable`
  padding: 8px 12px;
  margin-left: 12px;
  background-color: ${theme.colors.red200};
  border-radius: ${theme.radii[10]};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
`;

export const ModalHeading = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.font.medium};
    font-size: 18px;
    color: ${theme.colors.blue200};
  `}
`;
