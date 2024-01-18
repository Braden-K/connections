import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLOR_ONE } from "../styles/constants";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { ProfileStackParamList } from "../types/navigation";

const FriendsStackNavigator = () => {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLOR_ONE,
        },
      }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default FriendsStackNavigator;
