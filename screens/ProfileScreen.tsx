import { Text, View, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { profileStyles } from "../styles/profileTabStyles";

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <SafeAreaView style={profileStyles.container}>
      <Text style={profileStyles.header}>{user.username}</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
