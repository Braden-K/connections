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
        <Text>Puzzles Seen {numPuzzlesSeen}</Text>
        <Text>Puzzles Solved {numPuzzlesSolved}</Text>
        <Text>Win Rate {winRate}%</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
