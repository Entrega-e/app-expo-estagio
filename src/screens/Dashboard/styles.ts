import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 8px;
`;

export const Content = styled.ScrollView`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    margin-top: ${RFValue(16)}px;
    padding-bottom: 128px;
    border-radius: ${theme.radii[15]};
    background-color: ${theme.colors.gray300};
  `}
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    margin-top: ${RFValue(8)}px;
    font-family: ${theme.font.bold};
    font-size: ${theme.font.sizes[18]};
    line-height: ${theme.font.lineHeights[23]};
    color: ${theme.colors.green400};
  `}
`;
