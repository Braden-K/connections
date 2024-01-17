import { ActivityIndicator, View } from "react-native";
import { COLOR_THREE } from "../styles/constants";

const LoadingSpinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLOR_THREE} />
    </View>
  );
};

export default LoadingSpinner;
