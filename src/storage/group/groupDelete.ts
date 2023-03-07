import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerGetAllByGroup } from "@storage/player/playerGetAllByGroup";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupDelete(group: string) {
  try {
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);

    const allGroups = await groupsGetAll();
    const filteredGroups = allGroups.filter((groupName) => groupName !== group);
    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(filteredGroups)
    );
  } catch (error) {
    throw error;
  }
}
