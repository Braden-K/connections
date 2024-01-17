import { SafeAreaView, Text } from "react-native";
import { globalPageStyles } from "../styles/globalStyles";
import LoginInput from "../components/LoginInput";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { COLOR_TWO } from "../styles/constants";

const LoginScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text
        style={{
          marginTop: 40,
          marginBottom: 30,
          fontSize: 25,
          fontFamily: "poppins",
          color: COLOR_TWO,
        }}
      >
        Login to continue
      </Text>
      <LoginInput navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default LoginScreen;
