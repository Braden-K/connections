import { Text, SafeAreaView, View } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import PillButton from "../components/PillButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import { getApiPuzzlesByUserId } from "../firestoreApi/puzzles";

const PlayScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayHome">;
}) => {
  const userPuzzles = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );

  const user = useSelector((state: RootState) => state.user.user);

  const onPressLatest = async () => {
    console.log(userPuzzles);
    console.log("create query to get latest");
  };

  const onPressRandom = () => {
    console.log("create query to get random");
  };

  const onPressMine = () => {
    // TODO: make logic more complex- allow user to choose puzzle; for testing purposes here
    const puzzle = userPuzzles[0];
    for (const cat of puzzle.puzzle[0].tiles) {
      console.log(cat);
    }
    props.navigation.navigate("PlayPuzzle", { puzzle: puzzle });
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.largeText}>Play</Text>
      <View style={playHomeScreenStyles.playButtonView}>
        <PillButton
          text={"Latest"}
          color={"black"}
          width={100}
          onPress={onPressLatest}
        />
        <PillButton
          text={"Random"}
          color={"black"}
          width={100}
          onPress={onPressRandom}
        />
        <PillButton
          text={"Mine"}
          color={"black"}
          width={100}
          onPress={onPressMine}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
