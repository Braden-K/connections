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
import {
  COLOR_ONE,
  COLOR_THREE,
  COLOR_TWO,
  CORRECT_COLOR_ARRAY,
} from "../styles/constants";
import CorrectPuzzleModal from "../components/CorrectPuzzleModal";
import {
  getApiUserById,
  putApiUserPuzzleAttemptById,
} from "../firestoreApi/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadUser } from "../redux/userSlice";
import { Stats } from "../types/User";

const PlayPuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
  route: PlayPuzzleRouteProp;
}) => {
  const { puzzle } = props.route.params;
  const user = useSelector((state: RootState) => state.user.user);
  const [shuffledTiles, setShuffledTiles] = useState<Array<string>>([]);
  const [pressedTiles, setPressedTiles] = useState<Array<string>>([]);
  const [correctCategories, setCorrectCategories] = useState<Array<Category>>(
    []
  );
  const [numMistakes, setNumMistakes] = useState<number>(0);
  const [correctColorOrder, setCorrectColorOrder] =
    useState<Array<string>>(CORRECT_COLOR_ARRAY);
  const [correctModalVisible, setCorrectModalVisible] =
    useState<boolean>(false);
  const [alreadyGuessed, setAlreadyGuessed] = useState<string[][]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (numMistakes === 4 || correctCategories.length === 4) {
      setCorrectModalVisible(true);

      const logCompletionData = async () => {
        await putApiUserPuzzleAttemptById(
          user.id,
          puzzle.puzzleId,
          numMistakes < 4
        );
        const refreshedUser = await getApiUserById(user.id);
        if (refreshedUser) {
          dispatch(loadUser({ user: refreshedUser }));
        }
      };

      if (
        !user.puzzlesSeen ||
        user.puzzlesSeen.filter(
          (info: Stats) => info.puzzleId == puzzle.puzzleId
        ).length == 0
      ) {
        logCompletionData();
      }
    }
  }, [numMistakes, correctCategories]);

  console.log("user", user);

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
    for (const alreadyGuessedGroup of alreadyGuessed) {
      if (pressedTiles.every((tile) => alreadyGuessedGroup.includes(tile))) {
        alert("already guessed");
        return;
      }
    }

    for (const category of puzzle.puzzle) {
      if (!correctCategories.includes(category)) {
        if (
          category.tiles.filter((tile) => pressedTiles.includes(tile))
            .length === 4
        ) {
          setCorrectCategories(correctCategories.concat(category));
          setPressedTiles([]);
          return;
        }
      }
    }
    setAlreadyGuessed(alreadyGuessed.concat([[...pressedTiles]]));
    setNumMistakes(numMistakes + 1);
  };

  const onPressDeselect = () => {
    setPressedTiles([]);
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
        <CorrectPuzzleModal
          visible={correctModalVisible}
          categories={
            correctCategories.length === 4 ? correctCategories : puzzle.puzzle
          }
          colorOrder={correctColorOrder}
          navigation={props.navigation}
          setVisible={setCorrectModalVisible}
          correctPuzzle={numMistakes < 4}
        />
        <Text style={playHomeScreenStyles.titleText}>
          {"  " + puzzle.label}
        </Text>
        <PillButton
          text={generateXs(numMistakes)}
          color={COLOR_TWO}
          width={150}
          onPress={() => {}}
          disabled={true}
        />
      </View>
      <View style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
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
          color={pressedTiles.length === 4 ? COLOR_THREE : COLOR_TWO}
          width={100}
          onPress={onPressSubmit}
          disabled={pressedTiles.length !== 4}
        />
        <PillButton
          text={"Deselect"}
          color={COLOR_TWO}
          width={125}
          onPress={onPressDeselect}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayPuzzleScreen;
