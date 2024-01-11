import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import MyPuzzlesScreen from "../screens/MyPuzzlesScreen";
import CreatePuzzleScreen from "../screens/CreatePuzzleScreen";
import PlayPuzzleScreen from "../screens/PlayPuzzleScreen";

const CreateStackNavigator = () => {
  const Stack = createNativeStackNavigator<CreateStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MyPuzzles"
    >
      <Stack.Screen name="MyPuzzles" component={MyPuzzlesScreen} />
      <Stack.Screen name="CreatePuzzle" component={CreatePuzzleScreen} />
      <Stack.Screen name="PlayPuzzle" component={PlayPuzzleScreen} />
    </Stack.Navigator>
  );
};

export default CreateStackNavigator;
