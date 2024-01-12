import { Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <SafeAreaView style={profileStyles.container}>
      <Text style={profileStyles.header}>{user.username}</Text>
      <View>
        <Text>Puzzles Seen: {user.puzzlesSeen.length}</Text>
        <Text>
          Puzzles Solved:{" "}
          {user.puzzlesSeen.filter((info) => info.solved).length}
        </Text>
        <Text>Percentage Solved: </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
