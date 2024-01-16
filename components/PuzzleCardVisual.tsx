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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStart((start + 4) % 16);
    }, 3000);
    return () => clearInterval(interval);
  }, [start]);

  return (
    <View style={puzzleCard.visualView}>
      <View style={puzzleCard.visualRow}>
        <View style={puzzleCard.visualSqaure}>
          <Text style={puzzleCard.visualText}>{puzzleOptions[start]}</Text>
        </View>
        <View style={puzzleCard.visualSqaure}>
          <Text style={puzzleCard.visualText}>{puzzleOptions[start + 1]}</Text>
        </View>
      </View>
      <View style={puzzleCard.visualRow}>
        <View style={puzzleCard.visualSqaure}>
          <Text style={puzzleCard.visualText}>{puzzleOptions[start + 3]}</Text>
        </View>
        <View style={puzzleCard.visualSqaure}>
          <Text style={puzzleCard.visualText}>{puzzleOptions[start + 4]}</Text>
        </View>
      </View>
    </View>
  );
};

export default PuzzleCardVisual;
