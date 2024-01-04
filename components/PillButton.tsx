import { Text, TouchableOpacity } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";

const PillButton = (props: {
  text: string;
  color: string;
  width: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...playHomeScreenStyles.pillButton,
        borderColor: props.color,
        width: props.width,
      }}
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
