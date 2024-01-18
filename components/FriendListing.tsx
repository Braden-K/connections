import { View, Text, TouchableOpacity } from "react-native";
import { addFriendScreenStyles } from "../styles/friendsTabStyles";

const FriendListing = (props: { username: string; onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ width: "100%" }}>
      <View style={addFriendScreenStyles.UserListingView}>
        <Text style={addFriendScreenStyles.userListingText}>
          {props.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FriendListing;
