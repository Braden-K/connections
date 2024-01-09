import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { friendsScreenStyles } from "../styles/friendsTabStyles";
import PillButton from "../components/PillButton";
import { useState } from "react";
import { FriendsStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RequestModal from "../components/RequestModal";
import { User } from "../types/User";
import { getApiPendingUserFriendRequests } from "../firestoreApi/users";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const FriendsScreen = (props: {
  navigation: NativeStackNavigationProp<FriendsStackParamList, "FriendsHome">;
}) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [reuqestModalVisible, setRequestModalVisible] =
    useState<boolean>(false);
  const [requestingUsers, setRequestingUsers] = useState<User[]>([]);

  const handlePressRequests = async () => {
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
      <Text style={{ fontFamily: "code", fontSize: 30 }}>Friends</Text>
      <View style={friendsScreenStyles.buttonView}>
        <PillButton
          text="Add Friend"
          color="black"
          width={150}
          onPress={() => {
            props.navigation.navigate("AddFriend");
          }}
        />
        <PillButton
          text="Requests"
          color="black"
          width={150}
          onPress={handlePressRequests}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;
