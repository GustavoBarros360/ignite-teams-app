import { playerGetAllByGroup } from "./playerGetAllByGroup";

export async function playerGetManyByGroupAndTeam(group: string, team: string) {
  try {
    const playersByGroup = await playerGetAllByGroup(group);
    const playersByTeam = playersByGroup.filter(
      (player) => player.team === team
    );

    return playersByTeam ?? [];
  } catch (error) {
    throw error;
  }
}
