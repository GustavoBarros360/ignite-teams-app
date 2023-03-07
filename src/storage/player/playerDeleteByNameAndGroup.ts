import { playerAddByGroup } from "./playerAddByGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerGetAllByGroup } from "./playerGetAllByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

export async function playerDeleteByNameAndGroup(
  playerName: string,
  group: string
) {
  try {
    const players = await playerGetAllByGroup(group);
    const filteredPlayers = players.filter(
      (player) => player.name !== playerName
    );
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(filteredPlayers)
    );
  } catch (error) {
    throw error;
  }
}
