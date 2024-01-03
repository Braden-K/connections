import { SafeAreaView, Text } from "react-native";
import { globalPageStyles } from "../styles/globalStyles";
import LoginInput from "../components/LoginInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const LoginScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text>Login to continue</Text>
      <LoginInput navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default LoginScreen;
