import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Groups } from "@screens/Group";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="newGroup" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
