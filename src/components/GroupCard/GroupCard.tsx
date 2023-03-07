import { Container, Icon, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

export function GroupCard({ title, ...others }: GroupCardProps) {
  return (
    <Container {...others}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
