import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("newGroup");
  };

  const fetchGroups = async () => {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => navigation.navigate("players", { group: item })}
          />
        )}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
        contentContainerStyle={!groups.length && { flex: 1 }}
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
