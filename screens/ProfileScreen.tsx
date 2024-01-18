import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";
import PillButton from "../components/PillButton";
import { COLOR_ONE, COLOR_TWO, TILE_TEXT_COLOR } from "../styles/constants";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation";
import { createPerformanceReport } from "../utils/performanceUtils";
import PerformanceCard from "../components/PerformanceCard";

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
      <PerformanceCard
        desc1="TOTAL PUZZLES SOLVED"
        stat1={performaceReport.totalPuzzlesSolved}
        desc2="LEVELS SOLVED"
        stat2={performaceReport.levelsSolved}
        desc3="OTHERS SOLVED"
        stat3={performaceReport.nonLevelsSolved}
      />
      <PerformanceCard
        desc1="TOTAL WIN RATE"
        stat1={performaceReport.totalWinRate}
        desc2="LEVEL WIN RATE"
        stat2={performaceReport.levelWinRate}
        desc3="NON-LEVEL WIN RATE"
        stat3={performaceReport.nonLevelWinRate}
      />
      <PerformanceCard
        desc1="AVG MISTAKES MADE"
        stat1={performaceReport.totalAvgMistakes}
        desc2="TOTAL PUZZLES SEEN"
        stat2={performaceReport.totalPuzzlesSeen}
        desc3="NON-LEVELS SEEN"
        stat3={performaceReport.nonLevelsSeen}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
