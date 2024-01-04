import { Text, SafeAreaView, View } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import MyPuzzleRow from "../components/MyPuzzleRow";
import PillButton from "../components/PillButton";

const MyPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const userPuzzles: Array<PuzzleBoard> = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );

  const groupIntoThrees = (arr: Array<string>) => {
    const result: Array<Array<string>> = [];
    for (let i = 0; i < arr.length; i += 3) {
      result.push(arr.slice(i, i + 3));
    }
    return result;
  };

  const puzzleIds: Array<string> = userPuzzles.map((puzzle) => puzzle.puzzleId);
  const puzzleIdsForRows: Array<Array<string>> = groupIntoThrees(puzzleIds);
  const labels: Array<string> = Array(puzzleIds.length)
    .fill(0)
    .map((_, index) => (index + 1).toString());
  const labelsForRows: Array<Array<string>> = groupIntoThrees(labels);

  const onPlusPress = () => {
    props.navigation.navigate("CreatePuzzle");
  };

  return (
    <SafeAreaView style={myPuzzlesScreenStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text style={playHomeScreenStyles.largeText}>My Puzzles</Text>
        <PillButton
          text={"New"}
          color={"black"}
          width={70}
          onPress={onPlusPress}
        />
      </View>
      <View style={{ flex: 1 }}>
        {puzzleIdsForRows.map((puzzleIdsForRow, index) => (
          <MyPuzzleRow
            key={index}
            puzzleIds={puzzleIdsForRow}
            labels={labelsForRows[index]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MyPuzzlesScreen;
