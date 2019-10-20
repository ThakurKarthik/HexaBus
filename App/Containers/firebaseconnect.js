import React from "react";
import { View, Button } from "react-native";
import firebase from "firebase";

async function signup(email, pass) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, pass);

    console.log("Account created");

    // Navigate to the Home page, the user is auto logged in
  } catch (error) {
    console.log(error.toString());
  }
}

async function getData() {
  try {
    const ref = firebase.database().ref("/location");
    await ref.once("value", snapshot => {
      snapshot.forEach(snapshotchild => {
        snapshotchild.forEach(data => {
          console.log("data", data.val());
        });
      });
    });
    // console.log("Account created");

    // Navigate to the Home page, the user is auto logged in
  } catch (error) {
    console.log(error.toString());
  }
}
export default () => {
  return (
    <View style={{ flex: 1 }}>
      <Button
        onPress={() => signup("aravind@gmail.com", "123456")}
        title="user connect"
      />
      <Button
        onPress={() => {
          getData();
        }}
        title="fetch"
      />
    </View>
  );
};
