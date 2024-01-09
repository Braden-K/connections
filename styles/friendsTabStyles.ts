import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");

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
    borderWidth: 2,
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
  UserListingView: {
    width: width - 50,
    height: 40,
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 1,
  },
  userListingText: {
    fontFamily: "code",
    fontSize: 20,
  },
  plusText: {
    fontFamily: "code",
    fontSize: 20,
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
});
