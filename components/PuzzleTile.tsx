import { Text, TouchableOpacity } from "react-native";
import { playPuzzleScreenStyles } from "../styles/playTabStyles";
import { useEffect, useState } from "react";
import {
  TILE_COLOR,
  PRESSED_TILE_COLOR,
  TILE_TEXT_COLOR,
} from "../styles/constants";

const PuzzleTile = (props: {
  tile: string;
  pressedTiles: Array<string>;
  setPressedTiles: (tiles: Array<string>) => void;
}) => {
  const [color, setColor] = useState<string>(TILE_COLOR);

  useEffect(() => {
    if (props.pressedTiles.includes(props.tile)) {
      setColor(PRESSED_TILE_COLOR);
    } else {
      setColor(TILE_COLOR);
    }
  }, [props.pressedTiles]);

  const onPress = () => {
    if (props.pressedTiles.length === 4 && color === TILE_COLOR) {
      return;
    }

    if (color === TILE_COLOR) {
      props.setPressedTiles(props.pressedTiles.concat(props.tile));
    } else {
      props.setPressedTiles(
        props.pressedTiles.filter((tile) => tile !== props.tile)
      );
    }
  };

  const calcFontSize = (word: string) => {
    if (!word || word.length <= 8) {
      return 16;
    }
    return 12;
  };

  return (
    <TouchableOpacity
      style={{ ...playPuzzleScreenStyles.puzzleTile, backgroundColor: color }}
      onPress={onPress}
    >
      <Text
        style={{
          color: TILE_TEXT_COLOR,
          fontFamily: "code",
          fontSize: calcFontSize(props.tile),
        }}
      >
        {props.tile}
      </Text>
    </TouchableOpacity>
  );
};

export default PuzzleTile;
