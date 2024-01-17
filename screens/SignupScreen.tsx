import { SafeAreaView, Text } from "react-native";
import { globalPageStyles } from "../styles/globalStyles";
import SignupInput from "../components/SignupInput";
import { COLOR_TWO } from "../styles/constants";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SignupScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
}) => {
  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text
        style={{
          fontFamily: "poppins",
          color: COLOR_TWO,
          fontSize: 20,
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        Create an account to continue
      </Text>
      <SignupInput navigation={props.navigation} />
    </SafeAreaView>
  );
};

export default SignupScreen;
