import { View } from "react-native";
import PuzzleTile from "./PuzzleTile";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";

const PuzzleBoardRow = (props: { tiles: Array<string> }) => {
  return (
    <View style={playPuzzleScreenStyles.puzzleBoardRow}>
      {Array(4)
        .fill(0)
        .map((val, index) => (
          <PuzzleTile tile={props.tiles[index]} />
        ))}
    </View>
  );
};

export default PuzzleBoardRow;
