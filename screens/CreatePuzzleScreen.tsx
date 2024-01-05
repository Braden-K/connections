import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import CreatePuzzleForm from "../components/CreatePuzzleForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreatePuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={{ margin: 10 }}>
          <Text style={playHomeScreenStyles.largeText}>Create</Text>
        </View>
        <CreatePuzzleForm navigation={props.navigation} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreatePuzzleScreen;
