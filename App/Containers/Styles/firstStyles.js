import { StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../Themes/";
import { borderWidth } from "polished";

export default StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: "auto",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderWidth: 1
    // flex: 1
  },
  mapStyles: {
    ...StyleSheet.absoluteFillObject
  }
});
