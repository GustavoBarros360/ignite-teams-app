import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(groupName: string) {
  try {
    const groups = await groupsGetAll();

    const groupAlreadyExists = groups.includes(groupName);

    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo com esse nome.");
    }

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify([...groups, groupName])
    );
  } catch (error) {
    throw error;
  }
}
