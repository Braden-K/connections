import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { loginScreenStyles } from "../styles/loginStyles";
import { globalComponentStyles } from "../styles/globalStyles";
import { postApiSignUpUser } from "../firestoreApi/users";
import { COLOR_THREE } from "../styles/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const SignupInput = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Signup">;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const onPressSignup = async () => {
    const signupSuccess = await postApiSignUpUser(email, password, username);
    if (signupSuccess === 1) {
      props.navigation.navigate("Login");
    } else if (signupSuccess === 0) {
      alert("Authenication service error");
    } else if (signupSuccess === 2) {
      alert("Username taken");
    } else if (signupSuccess === 3) {
      alert("Account already exists with this email");
    } else {
      alert("Unknown error");
    }
  };

  return (
    <View style={loginScreenStyles.loginInput}>
      <Text style={{ fontFamily: "code", color: COLOR_THREE, fontSize: 18 }}>
        Email
      </Text>
      <TextInput
        style={loginScreenStyles.inputField}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={{ fontFamily: "code", color: COLOR_THREE, fontSize: 18 }}>
        Password
      </Text>
      <TextInput
        style={loginScreenStyles.inputField}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ fontFamily: "code", color: COLOR_THREE, fontSize: 18 }}>
        Display name
      </Text>
      <TextInput
        style={loginScreenStyles.inputField}
        onChangeText={(text) => setUsername(text)}
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
