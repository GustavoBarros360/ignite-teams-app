import { Container, Name, Icon } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";

interface PlayerCardProps {
  name: string;
  onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="secondary" onPress={onRemove} />
    </Container>
  );
}
