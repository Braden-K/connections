import { View } from "react-native";
import PuzzleTile from "./PuzzleTile";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";

const PuzzleBoardRow = () => {
  return (
    <View style={playPuzzleScreenStyles.puzzleBoardRow}>
      <PuzzleTile />
      <PuzzleTile />
      <PuzzleTile />
      <PuzzleTile />
    </View>
  );
};

export default PuzzleBoardRow;
