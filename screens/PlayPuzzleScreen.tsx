import { Text, SafeAreaView, View } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { PlayPuzzleRouteProp, PlayStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PuzzleBoardView from "../components/PuzzleBoardView";

const PlayPuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
  route: PlayPuzzleRouteProp;
}) => {
  const { puzzle } = props.route.params;

  const onPress = () => {
    console.log("Pressed");
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.largeText}>Play Puzzle!</Text>
      <PuzzleBoardView />
    </SafeAreaView>
  );
};

export default PlayPuzzleScreen;
