import { StyleSheet } from "react-native";
import { COLOR_TWO, TILE_TEXT_COLOR } from "./constants";

export const welcomeScreenStyles = StyleSheet.create({});

export const loginScreenStyles = StyleSheet.create({
  inputField: {
    height: 40,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 3,
    padding: 10,
    width: 220,
    borderColor: COLOR_TWO,
    color: TILE_TEXT_COLOR,
  },
  loginInput: {
    marginTop: 30,
    alignItems: "center",
  },
});
