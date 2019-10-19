import React, { Component } from "react";
import { View, StatusBar, Text } from "react-native";
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from "react-redux";
// import StartupActions from '../Redux/StartupRedux'
import RoundedButtons from "../Components/RoundedButton";
// Styles
import styles from "./Styles/firstStyles";
import MapView from "react-native-maps";
import InputPlace from "../Components/InputPlace";
class First extends Component {
  componentDidMount() {
    // this.props.startup()
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        {/* <ReduxNavigation /> */}
        <InputPlace placeholder="Pick up point" />
        <InputPlace placeholder="Drop point" />
        <View style={styles.mapContainer}>
          {/* <MapView
            style={styles.mapStyles}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          /> */}
        </View>
        {/* <Text>Hello world</Text> */}
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup())
// })

// export default connect(
//   null,
//   mapDispatchToProps
// )(First);

export default First;
