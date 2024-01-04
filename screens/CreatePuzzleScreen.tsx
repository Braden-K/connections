import { KeyboardAvoidingView, ScrollView, Text } from "react-native";
import CreatePuzzleForm from "../components/CreatePuzzleForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={playHomeScreenStyles.largeText}>Create</Text>
        <CreatePuzzleForm navigation={props.navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePuzzleScreen;
