import { View, Text, TouchableWithoutFeedback } from "react-native";
import { puzzleCard } from "../styles/puzzleCardStyles";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { COLOR_THREE, COLOR_TWO } from "../styles/constants";
import PuzzleCardVisual from "./PuzzleCardVisual";

const PuzzleCard = (props: {
  width: number;
  height: number;
  title: string;
  puzzle: PuzzleBoard;
  onPress: () => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={{
          ...puzzleCard.container,
          width: props.width,
          height: props.height,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "code",
              color: COLOR_THREE,
              fontSize: 20,
            }}
          >
            {props.title}
          </Text>
        </View>
        <View>
          <PuzzleCardVisual puzzle={props.puzzle} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PuzzleCard;
