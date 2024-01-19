import { TouchableOpacity, View, Text } from "react-native";
import { Stats } from "../types/User";

const ArchivedPuzzleListing = (props: {
  puzzleSeenData: Stats;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View></View>
    </TouchableOpacity>
  );
};

export default ArchivedPuzzleListing;
