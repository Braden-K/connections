import { Text, TouchableOpacity } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";
import { COLOR_THREE } from "../styles/constants";

const PillButton = (props: {
  text: string;
  color: string;
  width: number;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={props.disabled ? props.disabled : false}
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
