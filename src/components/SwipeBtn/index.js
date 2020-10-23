import React, { useState } from "react";
import { View , Text, Button , StyleSheet } from "react-native";


export default function SwipeBtn (props) {
    const [size] = useState(props.size);
    const [variant] = useState(props.variant);
    const [direction] = useState(props.direction);

    return (
    <Button
    title="idksix"
    className={`btn-${size} btn-${variant}`}{...props}
    >
        <View 
        className={`arrow-${direction}`}
        >            
        </View>
    </Button>
    );
}

const styles = StyleSheet.create({
    "btn-danger": {
        height: 95,
        width: 95,
        // border: "solid black 1px",
        position: "relative",
        marginTop: "65%",
        marginRight: "23%"
    },
    "btn-success" : {
        height: 95,
        width: 95,
        // border: "solid black 1px",
        position: "relative",
        marginTop: "65%",
        marginLeft: "64%"
    },
    "arrow-right" : {
        // borderRight: "10px solid",
        // borderBottom: "10px solid",
        height: 30,
        width: 30,
        // transform: "rotate(-45deg)",
        marginLeft: "20%"
    }, 
    "arrow-left" : {
        // borderRight: "10px solid",
        // borderBottom: "10px solid",
        height: 30,
        width: 30,
        // transform: "rotate(135deg)",
        marginLeft: "28%"
    }
  });