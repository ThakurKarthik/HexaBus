import { createStackNavigator, createAppContainer } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import FireBaseApp from "../Containers/firebaseconnect";
import styles from "./Styles/NavigationStyles";
import first from "../Containers/first";

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    first: { screen: first },
    firebaseapp: { screen: FireBaseApp }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "first",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
