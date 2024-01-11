import { View, Text } from "react-native";
import { Category } from "../types/PuzzleBoard";
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
            <Text style={{ fontSize: 15, fontFamily: "code" }}>
              {category.tiles[0]}, {category.tiles[1]}, {category.tiles[2]},{" "}
              {category.tiles[3]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
