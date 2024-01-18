import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";
import PillButton from "../components/PillButton";
import { COLOR_ONE, COLOR_TWO } from "../styles/constants";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation";
import { createPerformanceReport } from "../utils/performanceUtils";

const ProfileScreen = (props: {
  navigation: NativeStackNavigationProp<ProfileStackParamList, "Profile">;
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const userPuzzles = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );
  const performaceReport = createPerformanceReport(user);

  const onPressLogout = () => {
    signOut(auth)
      .then(() => {
        props.navigation.navigate("Welcome");
      })
      .catch((error) => {
        alert("Error logging out");
      });
  };

  return (
    <SafeAreaView style={profileStyles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ width: 80, backgroundColor: COLOR_ONE }} />
        <Text style={profileStyles.header}>{user.username}</Text>
        <TouchableOpacity onPress={onPressLogout} style={{ width: 80 }}>
          <Text style={{ color: COLOR_TWO, fontFamily: "code" }}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={profileStyles.performanceCard}>
        <View style={{ alignItems: "center" }}></View>
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyles.statText}>Puzzles Solved</Text>
          <Text style={profileStyles.numText}>{}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
