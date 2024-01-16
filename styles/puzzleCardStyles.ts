import { StyleSheet } from "react-native";
import { COLOR_FOUR, COLOR_ONE } from "./constants";

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
    width: 50,
    height: 50,
    backgroundColor: COLOR_FOUR,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  visualText: {
    fontFamily: "code",
    fontSize: 10,
  },
});
