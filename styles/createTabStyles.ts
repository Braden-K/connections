import { Dimensions, StyleSheet } from "react-native";

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
  },
  tileInput: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    paddingBottom: 1,
    paddingTop: 1,
  },
  container: {
    flex: 1,
    margin: 10,
  },
});
