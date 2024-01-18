import { StyleSheet } from "react-native";
import {
  COLOR_ONE,
  COLOR_THREE,
  COLOR_TWO,
  TILE_COLOR,
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
  smallNumText: {
    fontFamily: "code",
    fontSize: 20,
    color: COLOR_THREE,
    marginBottom: 20,
  },
  performanceCard: {
    backgroundColor: TILE_COLOR,
    width: "90%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 14,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
  },
});
