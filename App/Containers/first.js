import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  PermissionsAndroid,
  Button
} from "react-native";
import { withNavigation } from "react-navigation";
// import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from "react-redux";
// import StartupActions from '../Redux/StartupRedux'
import RoundedButtons from "../Components/RoundedButton";
// Styles
import styles from "./Styles/firstStyles";
import MapView, { Marker } from "react-native-maps";
import InputPlace from "../Components/InputPlace";
import firebase from "firebase";
import getClosestLocation from "../Services/getClosestLocation";

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
    initialRegion: null,
    fireBaseLocations: [],
    pickUpLocationIndex: null
  };

  componentDidMount() {
    this.requestCameraPermission();
    this.getCurrentLocation();
    firebase.initializeApp({
      apiKey: "AIzaSyAke-sLonY79mk3KWi4B85RFYKGeyqETZ4",
      authDomain: "hackathon-a63af.firebaseapp.com",
      databaseURL: "https://hackathon-a63af.firebaseio.com",
      // projectId: "hackathon-a63af",
      storageBucket: "hackathon-a63af.appspot.com"
      // messagingSenderId: "sender-id",
      // appId: "1:1012990809186:android:9153898b1b10c8a2806d3b"
      // measurementId:''
    });
    // this.props.startup()
    this.fetchCurrentLocations();
    this.fetchRoutes();
    this.fetchBuses();
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
        timeout: 10000,
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
    console.log("data", data);
    let min = 10000000,
      minIndex = 0;
    this.state.fireBaseLocations.forEach((location, index) => {
      const distance = getClosestLocation(
        data.lat,
        data.lng,
        location.latitude,
        location.longitude
      );
      console.log("min", min, "distance", distance, "location", location);
      if (distance < min) {
        min = distance;
        minIndex = index;
      }
    });
    this.setState(
      {
        location: {
          ...this.state.location,
          [pickOrDrop]: {
            latitude: this.state.fireBaseLocations[minIndex].latitude,
            longitude: this.state.fireBaseLocations[minIndex].longitude
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

  fetchCurrentLocations = async () => {
    const locations = [];
    const ref = firebase.database().ref("/location");
    await ref.once("value", snapshot => {
      snapshot.forEach(snapshotchild => {
        let locationObject = {};
        snapshotchild.forEach(data => {
          locationObject[data.key] = data.val();
        });
        locations.push(locationObject);
      });
    });
    this.setState({
      fireBaseLocations: locations
    });
  };

  fetchRoutes = () => {
    console.log("fetch Routes");
  };

  seeAvailable = () => {
    this.props.navigation.navigate("Booking", {
      busIds: [],
      busData: []
    });
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
          {!this.isEmpty(this.state.location.pickUp) &&
            !this.isEmpty(this.state.location.drop) && (
              <Button title="see available buses" onPress={this.seeAvailable} />
            )}
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

export default withNavigation(First);
