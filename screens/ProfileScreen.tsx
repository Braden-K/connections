import { Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userPuzzles = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );
  console.log("PUZZZZZZZZZ", userPuzzles);
  const numPuzzlesSeen = user.puzzlesSeen ? user.puzzlesSeen.length : 0;
  const numPuzzlesSolved = user.puzzlesSeen
    ? user.puzzlesSeen.filter((info) => info.solved).length
    : 0;
  let winRate =
    numPuzzlesSeen > 0 ? (numPuzzlesSolved / numPuzzlesSeen) * 100 : 0;
  winRate = Math.round(winRate * 100) / 100;
  const avgMistakes =
    numPuzzlesSolved > 0
      ? user.puzzlesSeen
          .filter((info) => info.solved)
          .map((info) => info.mistakesMade)
          .reduce((a, b) => a + b, 0) / numPuzzlesSolved
      : 0;

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
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyles.statText}>
            Average Mistakes when solved
          </Text>
          <Text style={profileStyles.numText}>{avgMistakes}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
