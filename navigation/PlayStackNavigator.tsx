import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import PlayScreen from "../screens/PlayScreen";
import PlayPuzzleScreen from "../screens/PlayPuzzleScreen";

const PlayStackNavigator = () => {
  const Stack = createNativeStackNavigator<PlayStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PlayHome"
    >
      <Stack.Screen name="PlayHome" component={PlayScreen} />
      <Stack.Screen name="PlayPuzzle" component={PlayPuzzleScreen} />
    </Stack.Navigator>
  );
};

export default PlayStackNavigator;
