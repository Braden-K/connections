import { Text, TouchableOpacity } from "react-native";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";
import { useState } from "react";
import { TILE_COLOR, PRESSED_TILE_COLOR } from "../styles/constants";

const PuzzleTile = (props: { tile: string }) => {
  const [color, setColor] = useState<string>(TILE_COLOR);

  const onPress = () => {
    setColor(color == PRESSED_TILE_COLOR ? TILE_COLOR : PRESSED_TILE_COLOR);
  };

  return (
    <TouchableOpacity
      style={{ ...playPuzzleScreenStyles.puzzleTile, backgroundColor: color }}
      onPress={onPress}
    >
      <Text>{props.tile}</Text>
    </TouchableOpacity>
  );
};

export default PuzzleTile;
