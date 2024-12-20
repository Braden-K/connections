import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FriendsPuzzleRouteProp,
  FriendsStackParamList,
} from "../types/navigation";
import { Permission, PuzzleBoard } from "../types/PuzzleBoard";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { useEffect, useState } from "react";
import { getApiUserById } from "../firestoreApi/users";
import { getApiPuzzlesByUserId } from "../firestoreApi/puzzles";
import LoadingSpinner from "../components/LoadingSpinner";
import VerticalPuzzleScroll from "../components/VerticalPuzzleScroll";
import { COLOR_THREE, COLOR_TWO } from "../styles/constants";
import Icon from "react-native-vector-icons/AntDesign";

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
              margin: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon name="arrowleft" size={30} color={COLOR_TWO} />
            </TouchableOpacity>
            <Text style={playHomeScreenStyles.titleText}>
              {friendUsername}'s Puzzles
            </Text>
            <View style={{ width: 30 }} />
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
