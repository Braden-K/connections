import { Text, SafeAreaView, View, FlatList } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import PillButton from "../components/PillButton";
import RectangularButton from "../components/RectangularButton";
import VerticalPuzzleScroll from "../components/VerticalPuzzleScroll";
import { COLOR_THREE, TILE_TEXT_COLOR } from "../styles/constants";

const MyPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  let userPuzzles: Array<PuzzleBoard> = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );

  const onPlusPress = () => {
    props.navigation.navigate("CreatePuzzle");
  };

  const onPressPuzzle = (puzzle: PuzzleBoard) => {
    props.navigation.navigate("PlayPuzzle", { puzzle: puzzle });
  };

  return (
    <SafeAreaView style={myPuzzlesScreenStyles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Text style={playHomeScreenStyles.titleText}>My Puzzles</Text>
        <PillButton
          text={"New"}
          color={COLOR_THREE}
          width={70}
          onPress={onPlusPress}
        />
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        {userPuzzles.length === 0 ? (
          <Text
            style={{ fontFamily: "code", fontSize: 20, color: TILE_TEXT_COLOR }}
          >
            You have no puzzles yet!
          </Text>
        ) : (
          <VerticalPuzzleScroll puzzles={userPuzzles} onPress={onPressPuzzle} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyPuzzlesScreen;
