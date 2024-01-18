import { User } from "../types/User";
import { View, Text, TouchableOpacity } from "react-native";
import { addFriendScreenStyles } from "../styles/friendsTabStyles";

const UserListing = (props: {
  isSearch: boolean;
  username: string;
  requested: boolean;
  added: boolean;
  onPress: () => void;
}) => {
  let rightDisplayText: string = "";
  if (props.isSearch) {
    rightDisplayText = props.requested
      ? "requested"
      : props.added
      ? "added"
      : "+";
  } else {
    rightDisplayText = "add back";
  }

  return (
    <View style={addFriendScreenStyles.UserListingView}>
      <Text style={addFriendScreenStyles.userListingText}>
        {props.username}
      </Text>
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.requested || props.added}
        style={{ width: "100%", alignItems: "flex-end" }}
      >
        <Text style={addFriendScreenStyles.plusText}>{rightDisplayText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserListing;
