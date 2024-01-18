import { ScrollView, View } from "react-native";
import { PuzzleBoard } from "../types/PuzzleBoard";
import PuzzleCard from "./PuzzleCard";
import { COLOR_ONE } from "../styles/constants";

const VerticalPuzzleScroll = (props: {
  puzzles: PuzzleBoard[];
  onPress: (puzzle: PuzzleBoard) => void;
}) => {
  const groupPuzzles = (puzzles: PuzzleBoard[], perRow: number) => {
    const puzzlesCopy = [...puzzles];
    puzzlesCopy.sort((a, b) => Number(a.label) - Number(b.label));
    const groups: PuzzleBoard[][] = [];
    for (let i = 0; i < puzzles.length; i += perRow) {
      groups.push(puzzlesCopy.slice(i, i + perRow));
    }
    return groups;
  };

  return (
    <ScrollView
      decelerationRate={0}
      snapToAlignment="center"
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 5 }}
    >
      {groupPuzzles(props.puzzles, 2).map((puzzle, index) => {
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <PuzzleCard
              width={140}
              height={175}
              title={puzzle[0].label}
              puzzle={puzzle[0]}
              onPress={() => props.onPress(puzzle[0])}
            />
            {puzzle[1] ? (
              <PuzzleCard
                width={140}
                height={175}
                title={puzzle[1].label}
                puzzle={puzzle[1]}
                onPress={() => props.onPress(puzzle[1])}
              />
            ) : (
              <View
                style={{ width: 125, height: 175, backgroundColor: COLOR_ONE }}
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default VerticalPuzzleScroll;
