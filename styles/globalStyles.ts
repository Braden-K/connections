import { StyleSheet } from "react-native";

export const globalPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
});

export const globalComponentStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "black",
    width: 150,
  },
  buttonText: {
    color: "white",
  },
});
