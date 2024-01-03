import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { loginScreenStyles } from "../styles/loginStyles";
import { globalComponentStyles } from "../styles/globalStyles";
import { postApiSignUpUser } from "../firestoreApi/users";

const SignupInput = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onPressSignup = () => {
    const signupSuccess = postApiSignUpUser(email, password, "");
    console.log("TODO sign up cointinue", signupSuccess);
  };

  return (
    <View style={loginScreenStyles.loginInput}>
      <Text>Email</Text>
      <TextInput
        style={loginScreenStyles.inputField}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={loginScreenStyles.inputField}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={globalComponentStyles.button}
        onPress={onPressSignup}
      >
        <Text style={globalComponentStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupInput;
