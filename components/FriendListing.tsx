import { View, Text, TouchableOpacity } from "react-native";
import { addFriendScreenStyles } from "../styles/friendsTabStyles";

const FriendListing = (props: { username: string; onPress: () => void }) => {
  return (
    <View style={addFriendScreenStyles.UserListingView}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={addFriendScreenStyles.userListingText}>
          {props.username}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendListing;
