import React from "react";
import { View, TextInput, Animated, Easing, Text } from "react-native";
import styles from "./Styles/placeInputStyles";
import RoundedButton from "../Components/RoundedButton";
import Icon from "react-native-vector-icons/AntDesign";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const GooglePlacesInput = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        if (details) {
          console.log(details.geometry.location);
          props.updateLocation(details.geometry.location, data);
        }
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyAhlVOMvTtPHXMMjCdp40zbTRhdBIX0XIE",
        language: "en", // language of the results
        types: "geocode" // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: "100%"
        },
        description: {
          fontWeight: "bold"
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        },
        container: {
          position: "relative"
        }
      }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "cafe"
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: "formatted_address"
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3"
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

export default class extends React.Component {
  expandInput = new Animated.Value(0);
  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      Animated.timing(this.expandInput, {
        toValue: 1,
        useNativeDriver: true,
        duration: 5000,
        easing: Easing.inOut()
      });
    } else if (prevProps.isActive && !this.props.isActive) {
      this.expandInput.setValue(0);
    }
  }
  render() {
    const { isActive, placeholder, extraData } = this.props;
    return isActive ? (
      extraData ? (
        <Text style={styles.description}>{extraData.description}</Text>
      ) : (
        <GooglePlacesInput updateLocation={this.props.updateLocation} />
      )
    ) : (
      <RoundedButton text={placeholder} onPress={this.props.toggleActive} />
    );
  }
}
