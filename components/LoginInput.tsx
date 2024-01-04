import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { loginScreenStyles } from "../styles/loginStyles";
import { globalComponentStyles } from "../styles/globalStyles";
import { postApiLoginUser } from "../firestoreApi/users";
import { getApiUserByEmail } from "../firestoreApi/users";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { getApiPuzzlesByUserId } from "../firestoreApi/puzzles";
import { pushAllUserPuzzles } from "../redux/puzzleSlice";

const LoginInput = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    const loginSuccess = await postApiLoginUser(email, password);

    if (loginSuccess) {
      const user = await getApiUserByEmail(email);
      if (user !== null) {
        dispatch(loginUser({ user: user }));
        const userPuzzles = await getApiPuzzlesByUserId(user.id);
        dispatch(pushAllUserPuzzles(userPuzzles));
        props.navigation.navigate("Home");
      }
    } else {
      console.log("todo: display wrong username or pass");
    }
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
        onPress={onPressLogin}
      >
        <Text style={globalComponentStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginInput;
