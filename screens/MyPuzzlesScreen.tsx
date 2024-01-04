import { Text, SafeAreaView, View } from "react-native";
import CircularButton from "../components/CircularButton";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";

const MyPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const userPuzzles: Array<PuzzleBoard> = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );
  console.log("user puzzles in state ", userPuzzles);

  const onPlusPress = () => {
    props.navigation.navigate("CreatePuzzle");
  };

  return (
    <SafeAreaView style={myPuzzlesScreenStyles.container}>
      <Text style={playHomeScreenStyles.largeText}>My Puzzles</Text>
      <View style={playHomeScreenStyles.playButtonView}>
        <CircularButton onPress={onPlusPress} />
      </View>
    </SafeAreaView>
  );
};

export default MyPuzzlesScreen;
