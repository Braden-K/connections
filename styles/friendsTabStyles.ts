import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  COLOR_ONE,
  COLOR_THREE,
  COLOR_TWO,
  TILE_TEXT_COLOR,
} from "./constants";

export const { width } = Dimensions.get("window");

export const friendsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: COLOR_ONE,
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
    borderWidth: 3,
    borderRadius: 5,
    padding: 5,
    width: width - 200,
    borderColor: COLOR_THREE,
    color: TILE_TEXT_COLOR,
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
    borderColor: COLOR_THREE,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  UserListingView: {
    width: "100%",
    height: 40,
    marginBottom: 5,
    borderColor: COLOR_TWO,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 90,
    borderRadius: 10,
  },
  userListingText: {
    fontFamily: "code",
    fontSize: 20,
    color: COLOR_TWO,
  },
  plusText: {
    fontFamily: "code",
    fontSize: 14,
    color: COLOR_THREE,
  },
});

export const requestModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 150,
  },
  modalContent: {
    backgroundColor: COLOR_ONE,
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
});
