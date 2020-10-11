import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// This file exports the Input, TextArea and FormBtn components

export function Input(props) {
  return (
    <View className="form-group">
      <Text style={{fontWeight:"bolder"}} htmlFor={props.label}>{props.label}</Text>
      <Input className="form-control" {...props} />
    </View>
  );
}

export function Checkbox(props) {
  return (
    <View className="form-group">
      <Text htmlFor={props.label}>{props.label}</Text>
      <TextInput style={{marginLeft: "3%"}} type="checkbox" {...props}/>     
    </View>
  );
}

export function TextArea(props) {
  return (
    <View className="form-group">
      {/* <textarea className="form-control" rows="20" {...props} /> */}
      <Text htmlFor={props.name}>{props.label}</Text>
      <TextInput className="form-control" {...props} />
    
    </View>
  );
}

// export function FormBtn(props) {
//   return (
//     <Button style={styles.pinkBtn} {...props}>
//       {props.children}
//     </Button>
//   );
// }

// const styles = StyleSheet.create({
//   pinkBtn: {
//     height: "45px",
//     width: "150px",
//     marginRight: "27.5%",
//     marginTop:"4%",
//     marginBottom: "3%",
//     fontWeight: "bold",
//     backgroundColor: "white",
//     color: "black"
//   }
// });
