import React from "react";
import { View } from "react-native";
import Col from "../Col";
import { StyleSheet, Text, View , Image } from 'react-native';


export default function DistanceContainer(props){
return (
    <View style={styles.DistanceContainer}>
        <Text style={styles.distContText}> {props.userName} is located only : </Text>
    <View style={styles.line}></View>

</View>
)
};

const styles = StyleSheet.create({
        DistanceContainer : {
            height: "435px",
            width: "600px",
            border: "black solid 1px",
            backgroundColor: "#8ABAD3FF",
            borderRadius: "10px",
            textAlign: "center",
            padding: "20px",
            marginLeft: "20%"
        },
        line : {
            border: "solid black 2px"
        },
        distContText : {
            fontSize: "18px"
        }
});