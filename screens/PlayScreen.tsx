import { Text, SafeAreaView, View } from "react-native";
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

const PlayScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayHome">;
}) => {
  const userPuzzles = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );

  const user = useSelector((state: RootState) => state.user.user);

  const onPressLevels = async () => {
    console.log(userPuzzles);
    console.log("create query to get latest");
  };

  const onPressRandom = async () => {
    const randomPublicPuzzle = await getApiRandomPublicPuzzle(user.id);
    if (randomPublicPuzzle) {
      console.log(
        "the random public puzzle is " + randomPublicPuzzle.puzzle[0].descriptor
      );
      props.navigation.navigate("PlayPuzzle", { puzzle: randomPublicPuzzle });
    } else {
      console.log("todo: handle no public puzzles");
    }
  };

  return (
    <SafeAreaView style={playHomeScreenStyles.container}>
      <Text style={playHomeScreenStyles.largeText}>Play</Text>
      <View style={playHomeScreenStyles.playButtonView}>
        <PillButton
          text={"Levels"}
          color={"black"}
          width={100}
          onPress={onPressLevels}
        />
        <PillButton
          text={"Random"}
          color={"black"}
          width={100}
          onPress={onPressRandom}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;
