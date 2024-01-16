import { Dimensions, ScrollView } from "react-native";
import React from "react";
import { PuzzleBoard } from "../types/PuzzleBoard";
import PuzzleCard from "./PuzzleCard";

const { width } = Dimensions.get("window");

const HorizontalCarousel = (props: {
  puzzles: PuzzleBoard[];
  cardTitles: string[];
  cardWidth: number;
  cardHeight: number;
  navigation: any;
}) => {
  const onPress = (puzzle: PuzzleBoard) => {
    props.navigation.navigate("PlayPuzzle", { puzzle: puzzle });
  };

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width - 100}
      snapToAlignment="center"
      showsHorizontalScrollIndicator={false}
    >
      {props.puzzles.map((puzzle, index) => {
        return (
          <PuzzleCard
            title={props.cardTitles[index]}
            puzzle={puzzle}
            width={100}
            height={175}
            onPress={() => {
              onPress(puzzle);
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default HorizontalCarousel;
