import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  globalComponentStyles,
  globalPageStyles,
} from "../styles/globalStyles";
import { Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { COLOR_THREE } from "../styles/constants";

const WelcomeScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Welcome">;
}) => {
  const onPressLogin = () => {
    props.navigation.replace("Login");
  };

  const onPressSignup = () => {
    props.navigation.replace("Signup");
  };

  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text
        style={{
          fontFamily: "code",
          color: COLOR_THREE,
          fontSize: 30,
          marginTop: 50,
          marginBottom: 40,
        }}
      >
        Welcome
      </Text>
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
        <Text style={globalComponentStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
