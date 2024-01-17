import { Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const numPuzzlesSeen = user.puzzlesSeen ? user.puzzlesSeen.length : 0;
  const numPuzzlesSolved = user.puzzlesSeen
    ? user.puzzlesSeen.filter((info) => info.solved).length
    : 0;
  const winRate =
    numPuzzlesSeen > 0 ? (numPuzzlesSolved / numPuzzlesSeen) * 100 : 0;

  return (
    <SafeAreaView style={profileStyles.container}>
      <Text style={profileStyles.header}>{user.username}</Text>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyles.statText}>Puzzles Seen</Text>
          <Text style={profileStyles.numText}>{numPuzzlesSeen}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyles.statText}>Puzzles Solved</Text>
          <Text style={profileStyles.numText}>{numPuzzlesSolved}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyles.statText}>Win Rate</Text>
          <Text style={profileStyles.numText}>{winRate}%</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
