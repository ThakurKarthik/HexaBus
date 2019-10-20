import "../Config";
import DebugConfig from "../Config/DebugConfig";
import React, { Component } from "react";
import { Provider } from "react-redux";
import RootContainer from "./RootContainer";
import createStore from "../Redux";
import firebase from "firebase";
// create our store
const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  // componentDidMount() {
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyAke-sLonY79mk3KWi4B85RFYKGeyqETZ4",
  //     authDomain: "hackathon-a63af.firebaseapp.com",
  //     databaseURL: "https://hackathon-a63af.firebaseio.com",
  //     // projectId: "hackathon-a63af",
  //     storageBucket: "hackathon-a63af.appspot.com"
  //     // messagingSenderId: "sender-id",
  //     // appId: "1:1012990809186:android:9153898b1b10c8a2806d3b"
  //     // measurementId:''
  //   });
  // }
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
