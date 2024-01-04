import { View } from "react-native";
import { myPuzzlesScreenStyles } from "../styles/createTabStyles";
import CircularButton from "./CircularButton";

const MyPuzzleRow = (props: {
  puzzleIds: Array<string>;
  labels: Array<string>;
}) => {
  return (
    <View style={myPuzzlesScreenStyles.puzzleRow}>
      {props.puzzleIds.map((puzzleId, index) => (
        <CircularButton
          key={index}
          text={props.labels[index]}
          color={"black"}
          onPress={() => {}}
        />
      ))}
    </View>
  );
};

export default MyPuzzleRow;
