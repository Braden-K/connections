import { Text, TouchableOpacity } from "react-native";
import { playHomeScreenStyles } from "../styles/playTabStyles";

const RectangularButton = (props: {
  text: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        ...playHomeScreenStyles.rectangularButton,
        borderColor: props.color,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          ...playHomeScreenStyles.RectangularButtonText,
          color: props.color,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default RectangularButton;
