import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { loginScreenStyles } from "../styles/loginStyles";
import { globalComponentStyles } from "../styles/globalStyles";
import { postApiLoginUser } from "../firestoreApi/users";
import { getApiUserByEmail } from "../firestoreApi/users";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/userSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import {
  getApiLevelPuzzles,
  getApiPuzzlesByUserId,
} from "../firestoreApi/puzzles";
import { pushAllUserPuzzles, pushLevels } from "../redux/puzzleSlice";
import LoadingSpinner from "./LoadingSpinner";
import { COLOR_THREE } from "../styles/constants";

const LoginInput = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    setIsLoading(true);
    const loginSuccess = await postApiLoginUser(email, password);

    if (loginSuccess) {
      const user = await getApiUserByEmail(email);
      if (user !== null) {
        dispatch(loadUser({ user: user }));
        const userPuzzles = await getApiPuzzlesByUserId(user.id);
        const levels = await getApiLevelPuzzles();
        dispatch(pushAllUserPuzzles(userPuzzles));
        dispatch(pushLevels(levels));
        props.navigation.replace("Home");
        setIsLoading(false);
      }
    } else {
      alert("Invalid email or password");
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <View style={loginScreenStyles.loginInput}>
        <Text style={{ fontFamily: "code", fontSize: 18, color: COLOR_THREE }}>
          Email
        </Text>
        <TextInput
          style={loginScreenStyles.inputField}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ fontFamily: "code", fontSize: 18, color: COLOR_THREE }}>
          Password
        </Text>
        <TextInput
          style={loginScreenStyles.inputField}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={globalComponentStyles.button}
          onPress={() => {
            onPressLogin();
          }}
        >
          <Text style={globalComponentStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginInput;
