import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  globalComponentStyles,
  globalPageStyles,
} from "../styles/globalStyles";
import { Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { COLOR_THREE } from "../styles/constants";
import { app, auth } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/userSlice";
import {
  getApiLevelPuzzles,
  getApiPuzzlesByUserId,
} from "../firestoreApi/puzzles";
import { pushAllUserPuzzles, pushLevels } from "../redux/puzzleSlice";
import { getApiUserByEmail } from "../firestoreApi/users";

const WelcomeScreen = (props: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Welcome">;
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initUser = async (user: any) => {
      const appUser = await getApiUserByEmail(user.email);
      console.log("APP USER", appUser);
      console.log("EMAIL", user.email);
      if (appUser !== null) {
        setIsLoading(true);
        dispatch(loadUser({ user: appUser }));
        const userPuzzles = await getApiPuzzlesByUserId(appUser.id);
        const levels = await getApiLevelPuzzles();
        dispatch(pushAllUserPuzzles(userPuzzles));
        dispatch(pushLevels(levels));
        setIsLoading(false);
        props.navigation.replace("Home");
      }
    };

    auth.onAuthStateChanged((user) => {
      initUser(user);
    });
  });

  const onPressLogin = () => {
    props.navigation.replace("Login");
  };

  const onPressSignup = () => {
    props.navigation.replace("Signup");
  };

  return (
    <SafeAreaView style={globalPageStyles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
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
        </>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
