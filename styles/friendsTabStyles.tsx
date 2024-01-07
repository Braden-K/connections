import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const friendsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 19,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
    marginTop: 10,
  },
});

export const addFriendScreenStyles = StyleSheet.create({
  searchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: width - 200,
  },
  searchView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width - 28,
  },
  searchButton: {
    width: 70,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
