import React from "react";
import { View, TextInput } from "react-native";
import styles from "./Styles/placeInputStyles";
export default function(props) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput {...props} />
    </View>
  );
}
