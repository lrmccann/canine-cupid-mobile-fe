import React from "react";
import { Text, View , StyleSheet } from "react-native";

export default function Wrapper(props) {
  return <View style={styles.wrapper} {...props} />;
}


const styles = StyleSheet.create({
  wrapper: {
    paddingTop: "50px",
    background: "#bbbcbd",
    height: "100%",
    display: "flex",
    flexFlow: "row wrap",
    padding: "20px",
    justifyContent: "space-around",
    alignContent: "flex-start",
    overflow: "auto"
  },
});