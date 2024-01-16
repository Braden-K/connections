import { View } from "react-native";
import PuzzleBoardRow from "./PuzzleBoardRow";
import { Category, PuzzleBoard } from "../types/PuzzleBoard";
import CorrectPuzzleBoardRow from "./CorrectPuzzleBoardRow";

const PuzzleBoardView = (props: {
  puzzle: PuzzleBoard;
  correctCategories: Array<Category>;
  shuffledTiles: Array<string>;
  pressedTiles: Array<string>;
  correctColorOrder: Array<string>;
  setPressedTiles: (tiles: Array<string>) => void;
}) => {
  console.log("rendering puzzle board view");
  console.log(props.puzzle);

  return (
    <View>
      {props.correctCategories.map((category, index) => (
        <CorrectPuzzleBoardRow
          category={category}
          color={props.correctColorOrder[index]}
          key={index}
        />
      ))}

      {Array(4 - props.correctCategories.length)
        .fill(0)
        .map((_, index) => (
          <PuzzleBoardRow
            tiles={props.shuffledTiles.slice(index * 4, index * 4 + 4)}
            key={index}
            pressedTiles={props.pressedTiles}
            setPressedTiles={props.setPressedTiles}
          />
        ))}
    </View>
  );
};

export default PuzzleBoardView;
