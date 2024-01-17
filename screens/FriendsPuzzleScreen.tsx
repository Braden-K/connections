import { Text, SafeAreaView, View, FlatList } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FriendsPuzzleRouteProp,
  FriendsStackParamList,
} from "../types/navigation";
import { Permission, PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import RectangularButton from "../components/RectangularButton";
import { useEffect, useState } from "react";
import { getApiUserById } from "../firestoreApi/users";
import { getApiPuzzlesByUserId } from "../firestoreApi/puzzles";
import LoadingSpinner from "../components/LoadingSpinner";
import VerticalPuzzleScroll from "../components/VerticalPuzzleScroll";
import { COLOR_THREE } from "../styles/constants";

const FriendsPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<
    FriendsStackParamList,
    "FriendsPuzzles"
  >;
  route: FriendsPuzzleRouteProp;
}) => {
  const { userId } = props.route.params;
  let [friendPuzzles, setFriendPuzzles] = useState<PuzzleBoard[]>([]);
  let [friendUsername, setFriendUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFriendData = async (friendId: string) => {
      console.log(friendId);
      const friend = await getApiUserById(friendId);
      let friendPuzzles = await getApiPuzzlesByUserId(friendId);
      console.log(friend);
      console.log(friendPuzzles);

      friendPuzzles = friendPuzzles.filter(
        (puzzle) => puzzle.permission !== Permission.PRIVATE
      );

      if (friend && friendPuzzles) {
        setFriendPuzzles(friendPuzzles);
        setFriendUsername(friend.username);
        setIsLoading(false);
      }
    };
    getFriendData(userId);
  }, []);

  const onPressPuzzle = (puzzle: PuzzleBoard) => {
    props.navigation.navigate("PlayPuzzle", {
      puzzle: puzzle,
    });
  };

  return (
    <SafeAreaView style={myPuzzlesScreenStyles.container}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={playHomeScreenStyles.titleText}>
              {friendUsername}'s Puzzles
            </Text>
          </View>
          <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
            {friendPuzzles.length === 0 ? (
              <Text
                style={{ fontFamily: "code", fontSize: 20, color: COLOR_THREE }}
              >
                {friendUsername} has no puzzles yet!
              </Text>
            ) : (
              <VerticalPuzzleScroll
                puzzles={friendPuzzles}
                onPress={onPressPuzzle}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default FriendsPuzzlesScreen;
