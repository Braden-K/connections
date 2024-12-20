import { View } from "react-native";
import PuzzleTile from "./PuzzleTile";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";

const PuzzleBoardRow = (props: {
  tiles: Array<string>;
  pressedTiles: Array<string>;
  setPressedTiles: (tiles: Array<string>) => void;
}) => {
  console.log("tiles", props.tiles);
  return (
    <View style={playPuzzleScreenStyles.puzzleBoardRow}>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <PuzzleTile
            tile={props.tiles[index]}
            key={index}
            pressedTiles={props.pressedTiles}
            setPressedTiles={props.setPressedTiles}
          />
        ))}
    </View>
  );
};

export default PuzzleBoardRow;
