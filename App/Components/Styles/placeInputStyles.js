import { StyleSheet } from "react-native";

export default StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderRadius: 25
  },
  input: {
    width: "90%",
    paddingLeft: 15
  },
  description: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 5
  }
});
