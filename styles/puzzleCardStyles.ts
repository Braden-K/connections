import { StyleSheet } from "react-native";
import {
  COLOR_FOUR,
  COLOR_ONE,
  TILE_COLOR,
  TILE_TEXT_COLOR,
} from "./constants";

export const puzzleCard = StyleSheet.create({
  container: {
    backgroundColor: COLOR_ONE,
    borderRadius: 15,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 20,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  visualView: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    margin: 5,
  },
  visualRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  visualSqaure: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    width: 60,
    height: 60,
    backgroundColor: TILE_COLOR,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  visualText: {
    fontFamily: "code",
    color: COLOR_FOUR,
  },
});
