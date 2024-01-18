import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { COLOR_ONE, COLOR_THREE, COLOR_TWO } from "./constants";

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
    color: COLOR_THREE,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
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
    backgroundColor: COLOR_ONE,
    alignItems: "center",
  },
  levelsView: {
    margin: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontFamily: "poppins",
    color: COLOR_TWO,
    marginBottom: 10,
  },
  subText: {
    fontSize: 25,
    fontFamily: "code",
    color: COLOR_THREE,
    width: "100%",
  },
  pillButton: {
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
    marginRight: 10,
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
    width: "100%",
  },
  publicButtonView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export const playModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLOR_ONE,
  },
  winText: {
    fontSize: 30,
    fontFamily: "code",
    color: COLOR_TWO,
    marginTop: 90,
  },
  miniModalBoardContainer: {
    marginTop: 40,
    margin: 10,
    marginBottom: 30,
    width: width - 50,
    height: width - 70,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  miniModalBoardRow: {
    width: width - 50,
    borderRadius: 5,
    height: (width - 70) / 4 - 6,
    justifyContent: "center",
    alignItems: "center",
  },
  miniModalText: {
    fontSize: 25,
    fontFamily: "code",
  },
  buttonView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    width: width - 50,
  },
});
