import { TouchableOpacity, Text } from "react-native";
import { AppButtonType } from "../types/BaseComponents";

const AppButton = (props: {
  text: string;
  color: string;
  font: string;
  width: number;
  height: number;
  type: AppButtonType;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={{}} onPress={props.onPress}>
      <Text
        style={{
          color: props.color,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
