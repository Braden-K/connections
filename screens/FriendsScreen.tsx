import { View, Text, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { friendsScreenStyles } from "../styles/friendsTabStyles";
import PillButton from "../components/PillButton";
import { useEffect, useState } from "react";
import { FriendsStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RequestModal from "../components/RequestModal";
import { User } from "../types/User";
import {
  getApiUserFriends,
  getApiPendingUserFriendRequests,
} from "../firestoreApi/users";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import FriendListing from "../components/FriendListing";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLOR_THREE, COLOR_TWO, TILE_TEXT_COLOR } from "../styles/constants";

const FriendsScreen = (props: {
  navigation: NativeStackNavigationProp<FriendsStackParamList, "FriendsHome">;
}) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [reuqestModalVisible, setRequestModalVisible] =
    useState<boolean>(false);
  const [requestingUsers, setRequestingUsers] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUserFriends = async () => {
      setIsLoading(true);
      const friends: User[] = await getApiUserFriends(currentUser.id);
      setIsLoading(false);
      setFriends(friends);
    };
    getUserFriends();
  }, [currentUser]);

  const handlePressRequests = async () => {
    console.log(currentUser);
    const users = await getApiPendingUserFriendRequests(currentUser.id);
    setRequestingUsers(users);
    setRequestModalVisible(true);
  };

  return (
    <SafeAreaView style={friendsScreenStyles.container}>
      <RequestModal
        visible={reuqestModalVisible}
        close={() => setRequestModalVisible(false)}
        requestingUsers={requestingUsers}
        setRequestingUsers={setRequestingUsers}
      />
      <Text style={{ fontFamily: "poppins", fontSize: 30, color: COLOR_TWO }}>
        Friends
      </Text>
      <View style={friendsScreenStyles.buttonView}>
        <PillButton
          text="Add Friend"
          color={COLOR_THREE}
          width={150}
          onPress={() => {
            props.navigation.navigate("AddFriend");
          }}
        />
        <PillButton
          text="Requests"
          color={COLOR_THREE}
          width={150}
          onPress={handlePressRequests}
        />
      </View>
      <View style={{ marginTop: 10, alignItems: "center", width: "100%" }}>
        <Text
          style={{
            color: TILE_TEXT_COLOR,
            fontFamily: "code",
            marginBottom: 3,
          }}
        >
          {friends.length > 0
            ? "Press to see friends' puzzles"
            : "Tap add friend to search usernames"}
        </Text>
        {!isLoading ? (
          <FlatList
            style={{ width: "100%" }}
            data={friends}
            renderItem={({ item }) => (
              <FriendListing
                username={item.username}
                onPress={() => {
                  props.navigation.navigate("FriendsPuzzles", {
                    userId: item.id,
                  });
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View>
            <LoadingSpinner />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;
