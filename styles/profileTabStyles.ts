import { StyleSheet } from "react-native";
import {
  COLOR_ONE,
  COLOR_THREE,
  COLOR_TWO,
  TILE_TEXT_COLOR,
} from "./constants";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLOR_ONE,
  },
  header: {
    fontFamily: "poppins",
    fontSize: 30,
    color: COLOR_TWO,
    marginBottom: 30,
  },
  statText: {
    fontFamily: "code",
    fontSize: 20,
    color: TILE_TEXT_COLOR,
  },
  numText: {
    fontFamily: "code",
    fontSize: 30,
    color: COLOR_THREE,
    marginBottom: 20,
  },
});
