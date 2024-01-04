import { View, Text } from "react-native";
import { Category, PuzzleBoard } from "../types/PuzzleBoard";
import { playModalStyles } from "../styles/playTabStyles";

export const MiniModalBoard = (props: {
  categories: Array<Category>;
  colorOrder: Array<string>;
}) => {
  return (
    <View style={playModalStyles.miniModalBoardContainer}>
      {props.categories.map((category: Category, index: number) => {
        return (
          <View
            style={{
              ...playModalStyles.miniModalBoardRow,
              backgroundColor: props.colorOrder[index],
            }}
            key={index}
          >
            <Text style={playModalStyles.miniModalText}>
              {category.descriptor}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
