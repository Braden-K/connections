import { View } from "react-native";
import PuzzleBoardRow from "./PuzzleBoardRow";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { shuffleArr } from "../utils/puzzleBoardUtils";

const PuzzleBoardView = (props: { puzzle: PuzzleBoard }) => {
  const tileArr: Array<string> = [];
  for (const tiles in props.puzzle.puzzle) {
    tileArr.concat(tiles);
  }
  const shuffledTiles = shuffleArr(tileArr);

  return (
    <View>
      {Array(4)
        .fill(0)
        .map((val, index) => (
          <PuzzleBoardRow
            tiles={shuffledTiles.slice(index * 4, index * 4 + 4)}
          />
        ))}
    </View>
  );
};

export default PuzzleBoardView;
