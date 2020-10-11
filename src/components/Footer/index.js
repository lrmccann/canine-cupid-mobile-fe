import React from "react";
import { StyleSheet, Text, View , Image } from 'react-native';


export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text 
      style={styles.textAlt}>Canine Cupid 2020 @ copyright</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 35,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    textAlign: "center",
    paddingBottom: "2%",
    paddingTop: ".5%",
    marginTop: "2%",
    // border: "solid black 1px"
  },
  textAlt : {
      fontSize: 15,
      // fontWeight: "bolder"
  }
});