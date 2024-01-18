import { View, Text } from "react-native";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { puzzleCard } from "../styles/puzzleCardStyles";
import { COLOR_FOUR } from "../styles/constants";
import { shuffleArr } from "../utils/puzzleBoardUtils";
import { useEffect, useState } from "react";

const PuzzleCardVisual = (props: { puzzle: PuzzleBoard }) => {
  const [start, setStart] = useState<number>(0);
  const [puzzleOptions, setPuzzleOptions] = useState<String[]>([]);

  useEffect(() => {
    let puzzleOptionsArr: String[] = [];
    for (let i = 0; i < 4; i++) {
      puzzleOptionsArr = puzzleOptionsArr.concat(props.puzzle.puzzle[i].tiles);
    }
    setPuzzleOptions(shuffleArr(puzzleOptionsArr));
  }, [props.puzzle]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((start + 4) % 16);
    }, 3000);
    return () => clearInterval(interval);
  }, [start]);

  const calcFontSize = (word: String) => {
    if (!word || word.length <= 8) {
      return 12;
    }
    return 9;
  };

  return (
    <View style={puzzleCard.visualView}>
      <View style={puzzleCard.visualRow}>
        <View style={puzzleCard.visualSqaure}>
          <Text
            style={{
              ...puzzleCard.visualText,
              fontSize: calcFontSize(puzzleOptions[start]),
            }}
          >
            {puzzleOptions[start]}
          </Text>
        </View>
        <View style={puzzleCard.visualSqaure}>
          <Text
            style={{
              ...puzzleCard.visualText,
              fontSize: calcFontSize(puzzleOptions[start + 1]),
            }}
          >
            {puzzleOptions[start + 1]}
          </Text>
        </View>
      </View>
      <View style={puzzleCard.visualRow}>
        <View style={puzzleCard.visualSqaure}>
          <Text
            style={{
              ...puzzleCard.visualText,
              fontSize: calcFontSize(puzzleOptions[start + 2]),
            }}
          >
            {puzzleOptions[start + 2]}
          </Text>
        </View>
        <View style={puzzleCard.visualSqaure}>
          <Text
            style={{
              ...puzzleCard.visualText,
              fontSize: calcFontSize(puzzleOptions[start + 3]),
            }}
          >
            {puzzleOptions[start + 3]}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PuzzleCardVisual;
