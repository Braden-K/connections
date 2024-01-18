import { View, Text } from "react-native";
import { profileStyles } from "../styles/profileTabStyles";
import { TILE_TEXT_COLOR } from "../styles/constants";

const PerformanceCard = (props: {
  desc1: string;
  stat1: number;
  desc2: string;
  stat2: number;
  desc3: string;
  stat3: number;
}) => {
  return (
    <View style={profileStyles.performanceCard}>
      <View style={{ alignItems: "center" }}>
        <Text style={profileStyles.statText}>{props.desc1}</Text>
        <Text style={profileStyles.numText}>{props.stat1}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "code", color: TILE_TEXT_COLOR }}>
            {props.desc2}
          </Text>
          <Text style={profileStyles.smallNumText}>{props.stat2}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "code", color: TILE_TEXT_COLOR }}>
            {props.desc3}
          </Text>
          <Text style={profileStyles.smallNumText}>{props.stat3}</Text>
        </View>
      </View>
    </View>
  );
};

export default PerformanceCard;
