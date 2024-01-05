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

const CorrectPuzzleModal = (props: {
  visible: boolean;
  categories: Array<Category>;
  colorOrder: Array<string>;
  navigation: NativeStackNavigationProp<PlayStackParamList, "PlayPuzzle">;
}) => {
  return (
    <Modal animationType="slide" visible={props.visible}>
      <SafeAreaView style={playModalStyles.container}>
        <View>
          <Text style={playModalStyles.winText}>You got it!</Text>
        </View>
        <MiniModalBoard
          categories={props.categories}
          colorOrder={props.colorOrder}
        />
        <Text style={{ fontFamily: "code", fontSize: 25 }}>Play another:</Text>
        <View style={playModalStyles.buttonView}>
          <PillButton
            text={"Latest"}
            color={"back"}
            width={100}
            onPress={() => {}}
          />
          <PillButton
            text={"Random"}
            color={"back"}
            width={100}
            onPress={() => {}}
          />
          <PillButton
            text={"Level"}
            color={"back"}
            width={100}
            onPress={() => {}}
          />
        </View>
        <RectangularButton
          text={"Go Home"}
          color={"black"}
          width={100}
          onPress={() => {
            props.navigation.navigate("PlayHome");
          }}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default CorrectPuzzleModal;
