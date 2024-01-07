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
import { User } from "firebase/auth";

const AddFriendScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [users, setUsers] = useState<Array<User>>([]);

  const onUsernameSearch = async () => {
    const searchResults = await getApiUserByUsernameFragment(searchPhrase);
    setUsers(searchResults);
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
    </SafeAreaView>
  );
};

export default AddFriendScreen;
