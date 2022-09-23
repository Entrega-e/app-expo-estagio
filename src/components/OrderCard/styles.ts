import { Camera } from "expo-camera";
import styled, { css, DefaultTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { OptionButtonProps, OrderCardProps } from ".";

type VariantProps = Pick<OrderCardProps, "variant">;
type StyledOptionButtonProps = OptionButtonProps & VariantProps;

const wrapperModifiers = {
  green: (theme: DefaultTheme) => css`
    color: ${theme.colors.green700};
    background-color: ${theme.colors.green600};

    ${OptionButton} {
      border: 1px solid ${theme.colors.green900};
      background-color: ${theme.colors.green700};
    }
  `,
  yellow: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow600};
    background-color: ${theme.colors.yellow100};

    ${OptionButton} {
      border: 1px solid ${theme.colors.yellow500};
      background-color: ${theme.colors.yellow400};
    }
  `,
  red: (theme: DefaultTheme) => css`
    color: ${theme.colors.red400};
    background-color: ${theme.colors.red100};

    ${OptionButton} {
      border: 1px solid ${theme.colors.red400};
      background-color: ${theme.colors.red300};
    }
  `,
};

const optionsButtonModifiers = {
  green: (theme: DefaultTheme) => css`
    border: 1px solid ${theme.colors.green900};
    background-color: ${theme.colors.green700};
  `,
  yellow: (theme: DefaultTheme) => css`
    border: 1px solid ${theme.colors.yellow500};
    background-color: ${theme.colors.yellow400};
  `,
  red: (theme: DefaultTheme) => css`
    border: 1px solid ${theme.colors.red400};
    background-color: ${theme.colors.red300};
  `,
};

const footerModifiers = {
  green: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.green800};
  `,
  yellow: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.yellow200};
  `,
  red: (theme: DefaultTheme) => css`
    background-color: ${theme.colors.red200};
  `,
};

const textModifiers = {
  green: (theme: DefaultTheme) => css`
    color: ${theme.colors.green700};
  `,
  yellow: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow600};
  `,
  red: (theme: DefaultTheme) => css`
    color: ${theme.colors.red300};
  `,
};

const footerTextModifiers = {
  green: (theme: DefaultTheme) => css`
    color: ${theme.colors.green900};
  `,
  yellow: (theme: DefaultTheme) => css`
    color: ${theme.colors.yellow500};
  `,
  red: (theme: DefaultTheme) => css`
    color: ${theme.colors.red400};
  `,
};

export const Wrapper = styled.View<VariantProps>`
  ${({ theme, variant }) => css`
    width: ${RFValue(165)}px;
    height: ${RFValue(90)}px;
    margin: ${RFValue(8)}px;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius: ${theme.radii[15]};

    ${!!variant && wrapperModifiers[variant](theme)};
  `}
`;

export const Options = styled.View`
  width: ${RFValue(28)}px;
  height: 100%;
  padding: 0;
  margin: 0;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const OptionButton = styled.TouchableOpacity<StyledOptionButtonProps>`
  ${({ theme, variant, top, bottom }) => css`
    width: 100%;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;

    border-top-right-radius: ${top ? theme.radii[25] : 0};
    border-top-left-radius: ${top ? theme.radii[25] : 0};

    border-bottom-right-radius: ${bottom ? theme.radii[25] : 0};
    border-bottom-left-radius: ${bottom ? theme.radii[25] : 0};

    ${!!variant && optionsButtonModifiers[variant](theme)};
  `}
`;

export const Content = styled.Pressable<VariantProps>`
  width: 100%;
  height: ${RFValue(50)}px;
  padding-left: ${RFValue(26)}px;
  justify-content: center;
  align-items: center;

  ${({ variant }) =>
    variant !== "yellow" &&
    css`
      padding-top: 10px;
    `}
`;

export const ContentText = styled.Text<VariantProps>`
  ${({ theme, variant }) => css`
    font-family: ${theme.font.medium};
    font-size: ${theme.font.sizes[12]};
    line-height: ${theme.font.lineHeights[16]};
    text-align: center;

    ${!!variant && textModifiers[variant](theme)};
  `}
`;

export const Footer = styled.Pressable<VariantProps>`
  ${({ theme, variant }) => css`
    width: 100%;
    min-height: ${RFValue(20)}px;
    padding-left: ${RFValue(26)}px;

    justify-content: center;
    align-items: center;

    border-bottom-right-radius: ${theme.radii[25]};
    border-bottom-left-radius: ${theme.radii[25]};

    ${!!variant && footerModifiers[variant](theme)};
  `}
`;

export const FooterText = styled.Text<VariantProps>`
  ${({ theme, variant }) => css`
    font-family: ${theme.font.bold};
    font-size: ${theme.font.sizes[10]};
    line-height: ${theme.font.lineHeights[12]};
    text-align: center;

    ${!!variant && footerTextModifiers[variant](theme)};
  `}
`;

export const StyledCamera = styled(Camera)`
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 32px;
  width: 100%;
  height: 100%;
`;
