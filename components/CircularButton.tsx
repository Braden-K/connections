import { Text, TouchableOpacity } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";

const CircularButton = (props: {
  text: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...myPuzzlesScreenStyles.circularButton,
        borderColor: props.color,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: props.color, fontFamily: "code", fontSize: 25 }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default CircularButton;
