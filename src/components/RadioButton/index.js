import React from "react";
import { TextInput , Text , View, Button } from "react-native";
 
//  Radiobutton set for 2 options - true or false
// Being used for Vaccinated and Trained fields

export default function RadioButton(props) {
    console.log("radiobuttonProps", props)
return (
        <View className="radio"
        >
        {/* <label > Vaccinated: </label> */}
        <Text> {props.radioLabel} &nbsp;&nbsp; </Text>

         <Text> Yes &nbsp;&nbsp; </Text>
        <Button
        type="radio"
        // name="vaccinated/trained"
        name= {props.radioName}
        // defaultChecked 
        value="true"
        // checked={props.defaultChecked}
        // defaultChecked={props.radioName === props.defaultChecked}
        onChange={props.onChange}
        ></Button>

        <Text> &nbsp;&nbsp; No &nbsp;&nbsp; </Text>
        <Button
        type="radio"
        // name="vaccinated/trained"
        name= {props.radioName}
    //    defaultChecked 
        value="false"
        // checked={props.defaultChecked}
        // defaultChecked={!(props.radioName === props.defaultChecked)}
        onChange={props.onChange}
        ></Button>
        </View>
    );
};

//////////////////////////////////
