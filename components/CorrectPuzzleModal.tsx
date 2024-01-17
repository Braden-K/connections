import { Modal, View, Text } from "react-native";
import { playModalStyles } from "../styles/playTabStyles";
import { Category } from "../types/PuzzleBoard";
import { SafeAreaView } from "react-native-safe-area-context";
import { MiniModalBoard } from "./MiniModalBoard";
import PillButton from "./PillButton";
import RectangularButton from "./RectangularButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PlayStackParamList } from "../types/navigation";
import { COLOR_THREE } from "../styles/constants";

const CorrectPuzzleModal = (props: {
  visible: boolean;
  categories: Array<Category>;
  colorOrder: Array<string>;
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
  setVisible: (visible: boolean) => void;
  correctPuzzle: boolean;
}) => {
  return (
    <Modal animationType="slide" visible={props.visible}>
      <SafeAreaView style={playModalStyles.container}>
        <View>
          <Text style={playModalStyles.winText}>
            {props.correctPuzzle ? "You got it!" : "Maybe next time!"}
          </Text>
        </View>
        <MiniModalBoard
          categories={props.categories}
          colorOrder={props.colorOrder}
        />
        <View style={playModalStyles.buttonView}>
          <PillButton
            text={"Home"}
            color={COLOR_THREE}
            width={200}
            onPress={() => {
              props.setVisible(false);
              props.navigation.navigate("PlayHome");
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CorrectPuzzleModal;
