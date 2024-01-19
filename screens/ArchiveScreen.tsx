import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { archiveScreenStyles } from "../styles/playTabStyles";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR_TWO } from "../styles/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ArchiveScreen = (props: {
  navigation: NativeStackNavigationProp<PlayStackParamList, "Archive">;
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const levels = useSelector((state: RootState) => state.puzzle.levels);

  const archiveListingData = user.puzzlesSeen.filter((puzzle) => {
    return !levels.reduce((acc, level) => {
      return acc || level.puzzleId === puzzle.puzzleId;
    }, false);
  });

  return (
    <SafeAreaView style={archiveScreenStyles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon name="arrowleft" size={30} color={COLOR_TWO} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "poppins",
            fontSize: 25,
            color: COLOR_TWO,
          }}
        >
          Archive
        </Text>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView
        style={{
          width: "100%",
          marginTop: 10,
        }}
      ></ScrollView>
    </SafeAreaView>
  );
};

export default ArchiveScreen;
