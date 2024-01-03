import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  globalComponentStyles,
  globalPageStyles,
} from "../styles/globalStyles";
import { Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const WelcomeScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Welcome">;
}) => {
  const onPressLogin = () => {
    props.navigation.navigate("Login");
  };

  const onPressSignup = () => {
    props.navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text>Welcome</Text>
      <TouchableOpacity
        style={globalComponentStyles.button}
        onPress={onPressLogin}
      >
        <Text style={globalComponentStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalComponentStyles.button}
        onPress={onPressSignup}
      >
        <Text style={globalComponentStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
