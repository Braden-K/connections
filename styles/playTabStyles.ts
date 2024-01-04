import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const SQUARE_SIZE = width / 4;

export const playPuzzleScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  puzzleBoardView: {
    flex: 1,
    marginBottom: 50,
  },
  puzzleBoardRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  puzzleTile: {
    flex: 1,
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    margin: 4,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const playHomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  largeText: {
    fontSize: 40,
    fontFamily: "code",
  },
  pillButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 25,
  },
  pillButtonText: {
    fontFamily: "code",
    fontSize: 20,
  },
  playButtonView: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
