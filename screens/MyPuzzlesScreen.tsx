import { Text, SafeAreaView, View, FlatList } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList, PlayStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import PillButton from "../components/PillButton";
import RectangularButton from "../components/RectangularButton";

const MyPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const userPuzzles: Array<PuzzleBoard> = useSelector(
    (state: RootState) => state.puzzle.userPuzzles
  );

  const onPlusPress = () => {
    props.navigation.navigate("CreatePuzzle");
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
        <Text style={playHomeScreenStyles.largeText}>My Puzzles</Text>
        <PillButton
          text={"New"}
          color={"black"}
          width={70}
          onPress={onPlusPress}
        />
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        {userPuzzles.length === 0 ? (
          <Text style={{ fontFamily: "code", fontSize: 20 }}>
            You have no puzzles yet!
          </Text>
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <FlatList
              data={userPuzzles}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <RectangularButton
                    text={(userPuzzles.indexOf(item) + 1).toString()}
                    color={"black"}
                    width={300}
                    onPress={() => {}}
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyPuzzlesScreen;
