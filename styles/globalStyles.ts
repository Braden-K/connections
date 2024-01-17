import { StyleSheet } from "react-native";
import { COLOR_ONE, COLOR_TWO } from "./constants";

export const globalPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: COLOR_ONE,
  },
});

export const globalComponentStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: COLOR_TWO,
    width: 150,
    borderRadius: 5,
  },
  buttonText: {
    color: COLOR_ONE,
  },
});
