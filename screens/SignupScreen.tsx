import { SafeAreaView, Text } from "react-native";
import { globalPageStyles } from "../styles/globalStyles";
import SignupInput from "../components/SignupInput";

const SignupScreen = () => {
  return (
    <SafeAreaView style={globalPageStyles.container}>
      <Text>Create an account to continue</Text>
      <SignupInput />
    </SafeAreaView>
  );
};

export default SignupScreen;
