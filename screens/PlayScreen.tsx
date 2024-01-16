import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
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
import { COLOR_TWO } from "../styles/constants";
import VerticalPuzzleScroll from "../components/VerticalPuzzleScroll";

const { width } = Dimensions.get("window");

const PlayScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayHome">;
}) => {
  const levels = useSelector((state: RootState) => state.puzzle.levels);
  const user = useSelector((state: RootState) => state.user.user);

  const onPressPlayRandom = async () => {
    const random = await getApiRandomPublicPuzzle(user.id);
    if (random) {
      props.navigation.navigate("PlayPuzzle", { puzzle: random });
    }
  };

  const onPressLevel = (puzzle: PuzzleBoard) => {
    props.navigation.navigate("PlayPuzzle", { puzzle: puzzle });
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.titleText}>Play</Text>
      <Text style={playHomeScreenStyles.subText}>Public</Text>
      <TouchableWithoutFeedback onPress={onPressPlayRandom}>
        <View
          style={{
            ...puzzleCard.container,
            width: width - 75,
            height: 75,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "poppins",
                color: COLOR_TWO,
                fontSize: 20,
              }}
            >
              Random public puzzle
            </Text>
          </View>
          <View>
            <Text>Content</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Text style={playHomeScreenStyles.subText}>Levels</Text>
      <View style={playHomeScreenStyles.levelsView}>
        <VerticalPuzzleScroll puzzles={levels} onPress={onPressLevel} />
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
