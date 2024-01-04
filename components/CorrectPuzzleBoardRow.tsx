import { Text, View } from "react-native";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";
import { Category } from "../types/PuzzleBoard";

const CorrectPuzzleBoardRow = (props: {
  category: Category;
  color: string;
}) => {
  return (
    <View
      style={{
        ...playPuzzleScreenStyles.correctPuzzleBoardRow,
        backgroundColor: props.color,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: "code" }}>
        {props.category.descriptor}
      </Text>
      <View style={{ flexDirection: "row" }}>
        {props.category.tiles.map((tile, index) =>
          index === 3 ? (
            <Text key={index}>{tile}</Text>
          ) : (
            <Text key={index}>{tile}, </Text>
          )
        )}
      </View>
    </View>
  );
};

export default CorrectPuzzleBoardRow;
