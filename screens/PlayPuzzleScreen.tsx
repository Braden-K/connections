import { Text, SafeAreaView, View } from "react-native";
import {
  playHomeScreenStyles,
  playPuzzleScreenStyles,
} from "../styles/playTabStyles";
import { PlayPuzzleRouteProp, PlayStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PuzzleBoardView from "../components/PuzzleBoardView";
import PillButton from "../components/PillButton";
import { useEffect, useState } from "react";
import { shuffleArr } from "../utils/puzzleBoardUtils";
import { Category } from "../types/PuzzleBoard";
import { CORRECT_COLOR_ARRAY } from "../styles/constants";

const PlayPuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
  route: PlayPuzzleRouteProp;
}) => {
  const { puzzle } = props.route.params;
  const [shuffledTiles, setShuffledTiles] = useState<Array<string>>([]);
  const [pressedTiles, setPressedTiles] = useState<Array<string>>([]);
  const [correctCategories, setCorrectCategories] = useState<Array<Category>>(
    []
  );
  const [numMistakes, setNumMistakes] = useState<number>(0);
  const [correctColorOrder, setCorrectColorOrder] =
    useState<Array<string>>(CORRECT_COLOR_ARRAY);

  useEffect(() => {
    if (numMistakes === 4) {
      console.log("game over");
    }

    if (correctCategories.length === 4) {
      console.log("game won");
    }
  }, [numMistakes, correctCategories]);

  useEffect(() => {
    let tileArr: Array<string> = [];
    for (let i = 0; i < 4; i++) {
      tileArr = tileArr.concat(puzzle.puzzle[i].tiles);
    }
    for (const category of correctCategories) {
      tileArr = tileArr.filter((tile) => !category.tiles.includes(tile));
    }
    setShuffledTiles(shuffleArr(tileArr));
  }, [correctCategories]);

  useEffect(() => {
    setCorrectColorOrder(shuffleArr(CORRECT_COLOR_ARRAY));
  }, []);

  const onPressSubmit = () => {
    for (const category of puzzle.puzzle) {
      if (
        category.tiles.filter((tile) => pressedTiles.includes(tile)).length ===
        4
      ) {
        setCorrectCategories(correctCategories.concat(category));
        setPressedTiles([]);
        return;
      } else {
        console.log("incorrect", category.descriptor);
        setNumMistakes(numMistakes + 1);
      }
    }
  };

  const generateXs = (numMistakes: number) => {
    let xs = "";
    for (let i = 0; i < 4 - numMistakes; i++) {
      xs += "x";
      if (i !== 4 - numMistakes - 1) {
        xs += " ";
      }
    }
    return xs;
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <View style={playHomeScreenStyles.headerView}>
        <Text style={playHomeScreenStyles.largeText}>Puzzle</Text>
        <PillButton
          text={generateXs(numMistakes)}
          color={"black"}
          width={150}
          onPress={() => {}}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <PuzzleBoardView
          puzzle={puzzle}
          correctCategories={correctCategories}
          shuffledTiles={shuffledTiles}
          pressedTiles={pressedTiles}
          setPressedTiles={setPressedTiles}
          correctColorOrder={correctColorOrder}
        />
      </View>
      <View style={playPuzzleScreenStyles.buttonView}>
        <PillButton
          text={"Submit"}
          color={"black"}
          width={100}
          onPress={onPressSubmit}
        />
        <PillButton
          text={"Deselect"}
          color={"black"}
          width={125}
          onPress={onPressSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayPuzzleScreen;
