import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import CreatePuzzleForm from "../components/CreatePuzzleForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import RectangularButton from "../components/RectangularButton";

const CreatePuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={{ marginLeft: 10 }}>
          <Text style={playHomeScreenStyles.titleText}>Create</Text>
        </View>
        <CreatePuzzleForm
          navigation={props.navigation}
          setIsLoading={setIsLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreatePuzzleScreen;
