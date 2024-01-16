import { Dimensions, StyleSheet } from "react-native";
import {
  COLOR_ONE,
  COLOR_THREE,
  COLOR_TWO,
  TILE_TEXT_COLOR,
} from "./constants";

const width = Dimensions.get("window").width;

export const myPuzzlesScreenStyles = StyleSheet.create({
  circularButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 1,
    right: 10,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLOR_ONE,
  },
  puzzleRow: {
    height: 50,
    width: width - 50,
  },
});

export const createPuzzleScreenStyles = StyleSheet.create({
  categoryInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingBottom: 1,
    paddingTop: 5,
    borderColor: COLOR_TWO,
    color: TILE_TEXT_COLOR,
  },
  tileInput: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingBottom: 1,
    paddingTop: 1,
    borderColor: COLOR_TWO,
    color: TILE_TEXT_COLOR,
  },
  categoryInputText: {
    fontFamily: "code",
    fontSize: 20,
    color: COLOR_TWO,
  },
  tileInputText: {
    fontFamily: "code",
    fontSize: 15,
    color: COLOR_THREE,
  },
  container: {
    flex: 1,
    margin: 10,
  },
});

export const permissionsModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 150,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.0,
    width: width - 50,
    height: width,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  checkBoxOuter: {
    marginTop: 25,
    marginBottom: 35,
  },
  checkBoxInner: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  checkBoxText: {
    fontFamily: "code",
    fontSize: 20,
  },
});
