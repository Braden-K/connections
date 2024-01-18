import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
} from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import PillButton from "../components/PillButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import {
  getApiPuzzlesByUserId,
  getApiRandomPublicPuzzle,
} from "../firestoreApi/puzzles";
import PuzzleCard from "../components/PuzzleCard";
import HorizontalCarousel from "../components/HorizontalCarousel";
import { Fragment, useEffect, useState } from "react";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { puzzleCard } from "../styles/puzzleCardStyles";
import {
  COLOR_THREE,
  COLOR_TWO,
  TILE_COLOR,
  TILE_TEXT_COLOR,
} from "../styles/constants";
import VerticalPuzzleScroll from "../components/VerticalPuzzleScroll";
import Icon from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");

const PlayScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayHome">;
}) => {
  const levels = useSelector((state: RootState) => state.puzzle.levels);
  const user = useSelector((state: RootState) => state.user.user);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleSwitch = () =>
    setShowCompleted((previousState) => !previousState);

  const filterLevels = (levels: PuzzleBoard[]) => {
    if (showCompleted) {
      return levels.filter((level) =>
        user.puzzlesSeen.reduce(
          (acc, puzzle) => acc || puzzle.puzzleId === level.puzzleId,
          false
        )
      );
    } else {
      return levels.filter(
        (level) =>
          !user.puzzlesSeen.reduce(
            (acc, puzzle) => acc || puzzle.puzzleId === level.puzzleId,
            false
          )
      );
    }
  };

  const onPressPlayRandom = async () => {
    console.log("In random");
    const random = await getApiRandomPublicPuzzle(user.id);
    if (random) {
      props.navigation.navigate("PlayPuzzle", { puzzle: random });
    } else {
      alert("No public puzzles available");
    }
  };

  const onPressLevel = (puzzle: PuzzleBoard) => {
    props.navigation.navigate("PlayPuzzle", { puzzle: puzzle });
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.titleText}>Play</Text>
      <Text style={playHomeScreenStyles.subText}>Public</Text>
      <TouchableOpacity onPress={onPressPlayRandom}>
        <View
          style={{
            ...puzzleCard.container,
            width: width - 75,
            height: 75,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "poppins",
                color: COLOR_TWO,
                fontSize: 20,
                marginBottom: 5,
              }}
            >
              Random public puzzle
            </Text>
            <Text>
              <Icon name="caretright" size={22} color={COLOR_THREE} />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={playHomeScreenStyles.subText}>Levels</Text>
      <View style={playHomeScreenStyles.levelsView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 12,
              color: COLOR_THREE,
              fontFamily: "poppins",
              marginRight: 5,
            }}
          >
            new
          </Text>
          <Switch
            trackColor={{ false: TILE_COLOR, true: TILE_COLOR }}
            thumbColor={COLOR_TWO}
            onValueChange={toggleSwitch}
            value={showCompleted}
          />
          <Text
            style={{
              fontSize: 12,
              color: COLOR_THREE,
              fontFamily: "poppins",
              marginLeft: 5,
            }}
          >
            seen
          </Text>
        </View>
        {filterLevels(levels).length > 0 ? (
          <VerticalPuzzleScroll
            puzzles={filterLevels(levels)}
            onPress={onPressLevel}
          />
        ) : (
          <Text
            style={{ color: COLOR_TWO, fontFamily: "poppins", marginTop: 50 }}
          >
            You played all existing levels!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
