import { View, Text, TouchableOpacity } from "react-native";
import { puzzleCard } from "../styles/puzzleCardStyles";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { COLOR_THREE } from "../styles/constants";
import PuzzleCardVisual from "./PuzzleCardVisual";

const PuzzleCard = (props: {
  width: number;
  height: number;
  title: string;
  puzzle: PuzzleBoard;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
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
              fontSize: props.title && props.title.length > 9 ? 14 : 20,
            }}
          >
            {props.title}
          </Text>
        </View>
        <View>
          <PuzzleCardVisual puzzle={props.puzzle} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PuzzleCard;
