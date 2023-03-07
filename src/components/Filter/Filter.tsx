import { TouchableOpacityProps } from "react-native";
import { Container, FilterStyleProps, Title } from "./styles";

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export function Filter({ title, isActive = false, ...others }: FilterProps) {
  return (
    <Container isActive={isActive} {...others}>
      <Title>{title}</Title>
    </Container>
  );
}
