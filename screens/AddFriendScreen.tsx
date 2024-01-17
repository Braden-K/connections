import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { friendsScreenStyles } from "../styles/friendsTabStyles";
import { addFriendScreenStyles } from "../styles/friendsTabStyles";
import { useState } from "react";
import { getApiUserByUsernameFragment } from "../firestoreApi/users";
import { User } from "../types/User";
import UserListing from "../components/UserListing";
import { putApiUserFriendRequestById } from "../firestoreApi/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { pushFriendRequest } from "../redux/userSlice";
import { COLOR_THREE, COLOR_TWO } from "../styles/constants";

const AddFriendScreen = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [blankUsersText, setBlankUsersText] = useState<string>("");

  const onUsernameSearch = async () => {
    if (searchPhrase == "") {
      setUsers([]);
    } else {
      let searchResults: User[] = await getApiUserByUsernameFragment(
        searchPhrase
      );
      searchResults = searchResults.filter(
        (res: User) => res.username !== currentUser.username
      );
      setUsers(searchResults);
    }
    setBlankUsersText("No users found");
  };

  const handleFriendRequest = async (userId: string) => {
    await putApiUserFriendRequestById(currentUser.id, userId);
    dispatch(pushFriendRequest(userId));
  };

  return (
    <SafeAreaView style={friendsScreenStyles.container}>
      <Text style={{ fontFamily: "code", fontSize: 25, color: COLOR_TWO }}>
        Search Username
      </Text>
      <View style={addFriendScreenStyles.searchView}>
        <TextInput
          style={addFriendScreenStyles.searchBar}
          placeholder="Search Username"
          onChangeText={(text) => setSearchPhrase(text)}
        />
        <TouchableOpacity
          style={addFriendScreenStyles.searchButton}
          onPress={onUsernameSearch}
        >
          <Text style={{ color: COLOR_THREE, fontFamily: "code" }}>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        {users.length > 0 ? (
          users.map((user: User, index) => {
            return (
              <UserListing
                key={index}
                isSearch={true}
                username={user.username}
                requested={currentUser.friendRequests.includes(user.id)}
                added={currentUser.friends.includes(user.id)}
                onPress={() => handleFriendRequest(user.id)}
              />
            );
          })
        ) : (
          <Text style={{ fontFamily: "code", fontSize: 20, color: COLOR_TWO }}>
            {blankUsersText}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddFriendScreen;
