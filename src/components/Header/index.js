import React from "react";
import {Row} from "../Grid";
// import "./images/dog-cupid.png";
import { StyleSheet, Text, View , Image } from 'react-native';

export default function Header(props) {
  return (
    <Row>
    <View style={styles.header}>
      <Image style={styles.headerImg} source={require("./images//heading-image.png")} alt="canine cupid"/>
      {/* <div className="picDiv">
        <img className="pic" alt="cupidog" src={require("./images/dog-cupid.png")}></img>
      </div> */}
      {/* <h1 className="title">Canine Cupid</h1> */}
      {/* <div className="picDivTwo">
        <img className="pic" alt="cupidog"  src={require("./images/dog-cupid.png")}></img>
      </div> */}
    </View>
    </Row>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "45%",
    width:"100%",
    backgroundColor: "white",
    alignContent:"center",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    /* background-image: url("./images//heading-image.png"); */
    /* padding-right: 50%; */
    // overflow: "fixed"
  },
  headerImg : {
    width: "100%",
    height: "100%"
  }

});