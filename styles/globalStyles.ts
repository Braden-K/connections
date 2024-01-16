import { StyleSheet } from "react-native";
import { COLOR_ONE } from "./constants";

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
    backgroundColor: "black",
    width: 150,
  },
  buttonText: {
    color: "white",
  },
});
