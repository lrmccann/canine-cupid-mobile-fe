import React, { useState } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button } from 'react-native';

export default function CardTwo(props) {
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  function switchPictures(){
    console.log(props , "hello")
    if(props.img2 === undefined){
      setUserPhotoLoaded(false)
      return(
        <View>Loading</View>
      )
    } else{
      setUserPhotoLoaded(true)
      setPetPhotoLoaded(false)
    }
  }
  function switchPicturesTwo(){
    if(petPhotoLoaded === false){
      setPetPhotoLoaded(true)
    }
  }
  if(petPhotoLoaded === true){
    console.log(props , "hello")
    return (
      <View>
       {/* <Col size="md-6"> */}
        <View style={styles.imgContainer}>
            {/*  may need to change button style     */}
          <Button title="User photo" onPress={switchPictures} style={{height:50 , width:128, backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:25 , padding: "5%"}}>{props.message}</Button></View>
          <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image style={styles.cardImage} alt={props.userName} source={props.img1} />
            </View>
            <View style={styles.contentCard}>
            <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {props.petName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Breed: {props.breed} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Age: {props.age} </Text>
          </View>
          </View>
          </View>
      //  </Col>
    );
  } if(userPhotoLoaded === true){
    console.log(props)
    return (
      <Col size="md-6">
          <View style={styles.imgContainer}>
            {/*  may need to change button style     */}
        <Button title="Pet photo" onPress={switchPicturesTwo} style={{height:50 , width:128, backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:25 , padding: "5%"}}>{props.messageTwo}</Button>
        </View>
        <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image alt={props.userName} source={props.img2} />
            </View>
          <View style={styles.contentCard}>
          <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {props.userName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Email: {props.email} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> City: {props.city} </Text>
          </View>
          </View>
      </Col>
    );
  }
}


const styles = StyleSheet.create ({
  switchPicBtnDiv: {
    flex:1,
    width: "20%" , 
    // float:"left", 
    marginLeft:"8.2%"
  },
  switchPicBtn : {
    height:50 , 
    width:128, 
    backgroundColor:"rgb(232, 86, 86)" , 
    color:"white" , 
    // border: "none" , 
    fontSize:25 , 
    padding: "5%"
  },
  card: {
    flex: 5,
    borderRadius: 2,
    height: 425,
    width: 500,
    // boxShadow: "0 3px 6px #999, 0 3px 6px #999",
    textAlign: "left",
    // float: "left",
    position: "relative",
    // marginBottom: "20%",
    // marginTop: "1%",
    // marginLeft: "7.5%",
    // marginRight: "5%",
    backgroundColor: "rgb(255 , 250, 250)"
  },
  imgContainer: {
    // backgroundColor: "transparent",
    height: "60%",
    overflow: "hidden",
    textAlign: "center",
    borderColor: "rgb(0 , 0, 0)",
    borderWidth: 1,
    borderStyle: "solid"

  },
  userPhotoLoaded : {
    width: "20%" , 
    // float:"left", 
    // marginLeft:"8.2%"
  },
  contentCard : {
    fontSize : 16,
    borderColor: "rgb(0 , 0, 0)",
    borderWidth: 1,
    borderStyle: "solid"
  },
  cardImage : {
    width: "60%"
  }
});

// .card > .content {
//   padding-left: 1rem;
//   padding-right: 1rem;
//   font-size: 10px;
// } 

