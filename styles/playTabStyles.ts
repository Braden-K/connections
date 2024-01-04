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
  correctPuzzleBoardRow: {
    width: width - 28,
    height: SQUARE_SIZE,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: 4,
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
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    height: 50,
    borderRadius: 25,
  },
  pillButtonText: {
    fontFamily: "code",
    fontSize: 20,
  },
  rectangularButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 5,
  },
  RectangularButtonText: {
    fontFamily: "code",
    fontSize: 20,
  },
  playButtonView: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
