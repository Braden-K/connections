import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import PlayScreen from "../screens/PlayScreen";
import PlayPuzzleScreen from "../screens/PlayPuzzleScreen";
import { COLOR_ONE } from "../styles/constants";
import ArchiveScreen from "../screens/ArchiveScreen";

const PlayStackNavigator = () => {
  const Stack = createNativeStackNavigator<PlayStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLOR_ONE },
      }}
      initialRouteName="PlayHome"
    >
      <Stack.Screen name="PlayHome" component={PlayScreen} />
      <Stack.Screen name="PlayPuzzle" component={PlayPuzzleScreen} />
      <Stack.Screen name="Archive" component={ArchiveScreen} />
    </Stack.Navigator>
  );
};

export default PlayStackNavigator;
