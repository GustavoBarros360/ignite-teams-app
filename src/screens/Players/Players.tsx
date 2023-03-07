import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { groupDelete } from "@storage/group/groupDelete";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerDeleteByNameAndGroup } from "@storage/player/playerDeleteByNameAndGroup";
import { playerGetAllByGroup } from "@storage/player/playerGetAllByGroup";
import { playerGetManyByGroupAndTeam } from "@storage/player/playerGetManyByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

interface RouteParams {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [typedPlayer, setTypedPlayer] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;

  const handleAddPlayer = async () => {
    if (!typedPlayer.trim()) {
      return Alert.alert("Nova Pessoa", "Informe o nome da nova pessoa");
    }

    const newPlayer = { name: typedPlayer, team };

    try {
      await playerAddByGroup(newPlayer, group);
      await fetchPlayers(team);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        Alert.alert("Nova Pessoa", "Não foi possível criar uma nova pessoa");
      }
    }

    setTypedPlayer("");
  };

  const fetchPlayers = async (team: string) => {
    try {
      const data = await playerGetManyByGroupAndTeam(group, team);
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlayers(team);
    }, [])
  );

  const handleTeamChange = async (team: string) => {
    setTeam(team);
    await fetchPlayers(team);
  };

  const handleRemovePlayer = async (playerName: string) => {
    await playerDeleteByNameAndGroup(playerName, group);
    await fetchPlayers(team);
  };

  const groupRemove = async () => {
    await groupDelete(group);
    navigation.navigate("groups");
  };

  const handleGroupRemove = async () => {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: groupRemove,
      },
    ]);
  };

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setTypedPlayer}
          value={typedPlayer}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              onPress={() => handleTeamChange(item)}
              isActive={team === item}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 80 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        type="secondary"
        title="Remover Turma"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
