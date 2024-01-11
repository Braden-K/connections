import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FriendsStackParamList } from "../types/navigation";
import CreatePuzzleScreen from "../screens/CreatePuzzleScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import FriendsScreen from "../screens/FriendsScreen";
import PlayPuzzleScreen from "../screens/PlayPuzzleScreen";
import FriendsPuzzlesScreen from "../screens/FriendsPuzzleScreen";

const FriendsStackNavigator = () => {
  const Stack = createNativeStackNavigator<FriendsStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FriendsHome"
    >
      <Stack.Screen name="FriendsHome" component={FriendsScreen} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      <Stack.Screen name="FriendRequests" component={CreatePuzzleScreen} />
      <Stack.Screen name="PlayPuzzle" component={PlayPuzzleScreen} />
      <Stack.Screen name="FriendsPuzzles" component={FriendsPuzzlesScreen} />
    </Stack.Navigator>
  );
};

export default FriendsStackNavigator;
