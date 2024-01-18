import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CreatePuzzleForm from "../components/CreatePuzzleForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import RectangularButton from "../components/RectangularButton";
import Icon from "react-native-vector-icons/AntDesign";
import { COLOR_ONE, COLOR_TWO } from "../styles/constants";

const CreatePuzzleScreen = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrowleft" size={30} color={COLOR_TWO} />
          </TouchableOpacity>
          <Text style={playHomeScreenStyles.titleText}>Create</Text>
          <TouchableOpacity disabled={true}>
            <Icon name="arrowleft" size={30} color={COLOR_ONE} />
          </TouchableOpacity>
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
