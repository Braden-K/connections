import { TouchableOpacity, View, Text } from "react-native";
import { Stats } from "../types/User";
import { COLOR_THREE, COLOR_TWO, TILE_TEXT_COLOR } from "../styles/constants";
import { archiveScreenStyles } from "../styles/playTabStyles";

const ArchivedPuzzleListing = (props: {
  stats: Stats;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={archiveScreenStyles.listing}>
        <Text style={{ fontFamily: "code", fontSize: 16, color: COLOR_THREE }}>
          {props.stats.label}
        </Text>
        <Text
          style={{ fontFamily: "code", fontSize: 14, color: TILE_TEXT_COLOR }}
        >
          by {props.stats.createdBy}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArchivedPuzzleListing;
