import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { friendsScreenStyles } from "../styles/friendsTabStyles";
import PillButton from "../components/PillButton";
import { useState } from "react";
import { FriendsStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const FriendsScreen = (props: {
  navigation: NativeStackNavigationProp<FriendsStackParamList, "FriendsHome">;
}) => {
  return (
    <SafeAreaView style={friendsScreenStyles.container}>
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
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;
