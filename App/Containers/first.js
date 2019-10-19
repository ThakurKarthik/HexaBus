import React, { Component } from "react";
import { View, StatusBar, Text, PermissionsAndroid } from "react-native";
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from "react-redux";
// import StartupActions from '../Redux/StartupRedux'
import RoundedButtons from "../Components/RoundedButton";
// Styles
import styles from "./Styles/firstStyles";
import MapView, { Marker } from "react-native-maps";
import InputPlace from "../Components/InputPlace";
class First extends Component {
  state = {
    pickUpInputActive: false,
    dropInputActive: false,
    location: {
      pickUp: {},
      drop: {}
    },
    extraData: {
      pickUp: "",
      drop: ""
    },
    initialRegion: null
  };
  async componentDidMount() {
    // this.props.startup()
    this.requestCameraPermission();
    this.getCurrentLocation();
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Please grant location",
          message: "Enabling this permission helps to get current location"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  async getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        };
        this.setState({
          initialRegion: region
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }
    );
  }
  isEmpty = object => Object.keys(object).length == 0;
  toggleActiveInput = id => {
    const secondInput =
      id === "pickUpInputActive" ? "dropInputActive" : "pickUpInputActive";
    const locationField = id === "pickUpInputActive" ? "drop" : "pickUp";
    if (this.isEmpty(this.state.location[locationField])) {
      this.setState(prevState => ({
        [id]: !prevState[id],
        [secondInput]: false
      }));
    } else {
      this.setState(prevState => ({
        [id]: !prevState[id]
      }));
    }
  };
  updateLocation = (data, extraData, pickOrDrop) => {
    console.log("data", data, extraData, pickOrDrop);
    this.setState(
      {
        location: {
          ...this.state.location,
          [pickOrDrop]: {
            latitude: data.lat,
            longitude: data.lng
          }
        },
        extraData: {
          ...this.state.extraData,
          [pickOrDrop]: extraData
        }
      },
      () => {
        this.state;
      }
    );
  };
  render() {
    console.log(this.state);
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        {/* <ReduxNavigation /> */}
        <InputPlace
          placeholder="Pick up point"
          isActive={this.state.pickUpInputActive}
          toggleActive={() => this.toggleActiveInput("pickUpInputActive")}
          updateLocation={(data, extraData) =>
            this.updateLocation(data, extraData, "pickUp")
          }
          fillLocation={this.state.location}
          extraData={this.state.extraData.pickUp}
        />
        <InputPlace
          placeholder="Drop point"
          isActive={this.state.dropInputActive}
          toggleActive={() => this.toggleActiveInput("dropInputActive")}
          updateLocation={(data, extraData) =>
            this.updateLocation(data, extraData, "drop")
          }
          extraData={this.state.extraData.drop}
        />
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyles}
            initialRegion={this.state.initialRegion}
          >
            {Object.keys(this.state.location.pickUp).length > 0 && (
              <Marker coordinate={this.state.location.pickUp} title="pick up" />
            )}
            {Object.keys(this.state.location.drop).length > 0 && (
              <Marker coordinate={this.state.location.drop} title="drop" />
            )}
          </MapView>
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
