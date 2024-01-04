import { Text, SafeAreaView, View } from "react-native";
import {
  playHomeScreenStyles,
  playPuzzleScreenStyles,
} from "../styles/playTabStyles";
import { PlayPuzzleRouteProp, PlayStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PuzzleBoardView from "../components/PuzzleBoardView";
import PillButton from "../components/PillButton";

const PlayPuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
  route: PlayPuzzleRouteProp;
}) => {
  const { puzzle } = props.route.params;

  const onPressSubmit = () => {
    console.log("Pressed");
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.largeText}>Puzzle</Text>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <PuzzleBoardView puzzle={puzzle} />
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
