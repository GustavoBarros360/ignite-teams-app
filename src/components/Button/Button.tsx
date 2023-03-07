import { ButtonTypeStyleProps, Title, Container } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ title, type = "primary", ...others }: ButtonProps) {
  return (
    <Container type={type} {...others}>
      <Title>{title}</Title>
    </Container>
  );
}
