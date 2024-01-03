import { Text, TouchableOpacity } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";

const CircularButton = (props: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={myPuzzlesScreenStyles.circularButton}
      onPress={props.onPress}
    >
      <Text>+</Text>
    </TouchableOpacity>
  );
};

export default CircularButton;
