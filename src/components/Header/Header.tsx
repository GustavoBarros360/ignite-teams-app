import { BackButton, BackIcon, Container, Logo } from "./styles";
import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={() => navigation.navigate("groups")}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg}></Logo>
    </Container>
  );
}
