import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { archiveScreenStyles } from "../styles/playTabStyles";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR_TWO } from "../styles/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArchivedPuzzleListing from "../components/ArchivedPuzzleListing";
import { getApiPuzzleByPuzzleId } from "../firestoreApi/puzzles";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const ArchiveScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "Archive">;
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const levels = useSelector((state: RootState) => state.puzzle.levels);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const puzzleStats = user.puzzlesSeen.filter((puzzle) => {
    return !levels.reduce((acc, level) => {
      return acc || level.puzzleId === puzzle.puzzleId;
    }, false);
  });

  const onPuzzlePress = async (puzzleId: string) => {
    setIsLoading(true);
    const puzzle = await getApiPuzzleByPuzzleId(puzzleId);
    if (puzzle) {
      setIsLoading(false);
      props.navigation.navigate("PlayPuzzle", {
        puzzle: puzzle,
      });
    } else {
      setIsLoading(false);
      alert("Error loading puzzle from archive");
    }
  };

  return (
    <SafeAreaView style={archiveScreenStyles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrowleft" size={30} color={COLOR_TWO} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "poppins",
            fontSize: 25,
            color: COLOR_TWO,
          }}
        >
          Archive
        </Text>
        <View style={{ width: 30 }} />
      </View>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View style={{ marginTop: 10, alignItems: "center", width: "100%" }}>
          <ScrollView style={{ width: "100%" }}>
            {puzzleStats.map((stats, index) => {
              return (
                <View style={{ marginBottom: 5 }}>
                  <ArchivedPuzzleListing
                    key={index}
                    stats={stats}
                    onPress={() => onPuzzlePress(stats.puzzleId)}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ArchiveScreen;
