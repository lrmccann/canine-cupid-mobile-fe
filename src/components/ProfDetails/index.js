import React  from "react";
import { Text, View , StyleSheet } from "react-native";
import Col from "../Col";


export default function ProfDetails(props) {
    return (
        <View style={styles.profContainer}>
            <Col size="md-12">
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
            </Col>
        </View>
    )

}

const styles = StyleSheet.create({
    profContainer: {
        // justifyContent:"center",
        marginTop : "8%",
        height: 900,
        marginLeft: "15%"
    },
    profDetails : {
        // border: "solid 1px black",
        padding: 5,
        height: 225,
        backgroundColor: "white",
        /* width:100%; */
        // marginLeft: "25%",
        // float: "left",
        width: "80%",
        flexWrap: "nowrap",
        // marginLeft: "65%",
        /* margin:auto; */
    },
    profContent : {
        padding: "1.75%",
        color:"black",
        // fontWeight: "bolder"
    },
    profText : {
        textAlign: "center",
        marginBottom: "2.5%"
    },
    line : {
        // border: "solid black 1px", 
        marginBottom : "2%"
    },
    contentOne : {
        fontSize : 10,
        flexDirection : "column"
    }
});
