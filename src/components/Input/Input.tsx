import { TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";

interface InputProps extends TextInputProps {}

export function Input({ ...others }: InputProps) {
  const { COLORS } = useTheme();
  return (
    <Container placeholderTextColor={COLORS.GRAY_300} {...others}></Container>
  );
}
