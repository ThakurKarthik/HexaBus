import { createStackNavigator, createAppContainer } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";

import styles from "./Styles/NavigationStyles";
import first from "../Containers/first";
import Booking from '../Containers/Booking'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    first: { screen: first },
    Booking: { screen: Booking} 
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "Booking",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
