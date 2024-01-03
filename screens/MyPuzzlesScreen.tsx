import { Text, SafeAreaView } from "react-native";
import CircularButton from "../components/CircularButton";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";

const MyPuzzlesScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const onPlusPress = () => {
    props.navigation.navigate("CreatePuzzle");
  };

  return (
    <SafeAreaView style={myPuzzlesScreenStyles.container}>
      <Text>Testing</Text>
      <CircularButton onPress={onPlusPress} />
    </SafeAreaView>
  );
};

export default MyPuzzlesScreen;
