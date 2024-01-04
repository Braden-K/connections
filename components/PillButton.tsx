import { Text, TouchableOpacity } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";

const PillButton = (props: {
  text: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{ ...playHomeScreenStyles.pillButton, borderColor: props.color }}
      onPress={props.onPress}
    >
      <Text
        style={{ ...playHomeScreenStyles.pillButtonText, color: props.color }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default PillButton;
