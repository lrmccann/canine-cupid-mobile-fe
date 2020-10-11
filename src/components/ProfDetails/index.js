import React  from "react";
import { Text, View , StyleSheet } from "react-native";
import Col from "../Col";


export default function ProfDetails(props) {
    return (
        <View style={styles.profContainer} className="container theCont">
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
        marginTop : "6%"
    },
    profDetails : {
        // border: "solid 1px black",
        padding: "5px",
        height: "80%",
        backgroundColor: "white",
        /* width:100%; */
        marginLeft: "20%",
        // float: "left",
        width:"80%",
        marginLeft: "65%",
        marginTop: "5%",
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
        fontSize : 16
    }
});
