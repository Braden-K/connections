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
import UserListing from "../components/UserSearchListing";
import { putApiUserFriendRequestById } from "../firestoreApi/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { pushFriendRequest } from "../redux/userSlice";

const AddFriendScreen = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const onUsernameSearch = async () => {
    if (searchPhrase == "") {
      setUsers([]);
    } else {
      const searchResults: User[] = await getApiUserByUsernameFragment(
        searchPhrase
      );
      setUsers(searchResults);
    }
  };

  const handleFriendRequest = async (userId: string) => {
    await putApiUserFriendRequestById(currentUser.id, userId);
    dispatch(pushFriendRequest(userId));
  };

  return (
    <SafeAreaView style={friendsScreenStyles.container}>
      <Text style={{ fontFamily: "code", fontSize: 25 }}>
        Add Friend Screen
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
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        {users.map((user: User, index) => {
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
        })}
      </View>
    </SafeAreaView>
  );
};

export default AddFriendScreen;
