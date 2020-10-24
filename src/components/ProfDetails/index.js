import React  from "react";
import { Text, View , StyleSheet } from "react-native";
import { EditProfileButton } from "../Button";
import Col from "../Col";


export default function ProfDetails(props) {
    return (
        <View style={styles.profContainer}>
                <View style={styles.profDetails}>
                    <View style={styles.profContent}>
                        <Text style={styles.profText}>Profile Details</Text>
                        <View style={styles.line}></View>
                        <Text style={styles.contentOne}>{props.children}</Text>
                        {/* <h4>Username:&nbsp;&nbsp; {user.userName}</h4>
                        <h4>Location:&nbsp;&nbsp;&nbsp; {user.city}&nbsp;,&nbsp;&nbsp;&nbsp; {user.zipCode} </h4>
                        <h4>About pet:&nbsp; {user.info}</h4>
                        <h4>Join Date:&nbsp;&nbsp;&nbsp; */}
                        {/* </h4> */}
                    </View>
                </View>
        </View>
    )

}

const styles = StyleSheet.create({
    profContainer: {
        // position : "absolute",
        // justifyContent:"center",
        top : 40,
        height: 400,
        marginLeft: "8%",
    },
    profDetails : {
        // border: "solid 1px black",
        padding: 5,
        height: 270,
        backgroundColor: "white",
        /* width:100%; */
        // marginLeft: "25%",
        // float: "left",
        width: 350,
        borderTopColor : "rgb(0 , 0 , 0)",
        borderStyle: "solid",
        borderWidth: 1,
        // flexWrap: "wrap",
        // marginLeft: "65%",
        /* margin:auto; */
    },
    profContent : {
        // padding: "1.75%",
        color:"black",
    },
    profText : {
        textAlign: "center",
        marginBottom: "2.5%",
        fontWeight : "bold",
        fontSize : 20
    },
    line : {
        // border: "solid black 1px", 
        marginBottom : "2%"
    },
    contentOne : {
        flexDirection : "column"
    }
});
