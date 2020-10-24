import React, { useState } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";


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
      <View style={{position : "relative" , marginLeft : 31}}>
        <View style={styles.switchPicBtnDiv}>
      <View style={styles.switchPicBtn}>
      {/*  may need to change button style     */}
        <TouchableWithoutFeedback
        onPress={switchPictures} 
        style={{height:50 , width:128, backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:25 , padding: "5%"}}>
          <Text style={styles.switchPicBtnText}>{props.message} </Text>
        </TouchableWithoutFeedback>
        </View>
        </View>
      <View style={styles.card}>
       {/* <Col size="md-6"> */}
          {/* <View style={styles.card}> */}
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
      <View style={{position : "relative" , marginLeft : 31}}>
        <View style={styles.switchPicBtnDiv}>
      <View style={styles.switchPicBtn}>
      {/*  may need to change button style     */}
        <TouchableWithoutFeedback
        onPress={switchPicturesTwo} 
        style={{height:50 , width:128, backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:25 , padding: "5%"}}
        >
          <Text style={styles.switchPicBtnText}>{props.message} </Text>
        </TouchableWithoutFeedback>
        </View>
        </View>
      <View style={styles.card}>
       {/* <Col size="md-6"> */}
          {/* <View style={styles.card}> */}
        <View style={styles.imgContainer}>
            <Image style={styles.cardImage} alt={props.userName} source={props.img2} />
            </View>
            <View style={styles.contentCard}>
            <Text style={{fontSize:18 , fontWeight:"bold" }}> Name: {props.userName} </Text>
           <Text style={{fontSize:18 , fontWeight:"bold" , paddingTop : 5}}> Breed: {props.email} </Text>
           <Text style={{fontSize:18 , fontWeight:"bold" , paddingTop : 5}}> Age: {props.city} </Text>
          </View>
          </View>
         </View>
    );
  }
}


const styles = StyleSheet.create ({
  switchPicBtnDiv: {
    width: "20%" , 
    left : 239.8,
    top : 30.5,
    // float:"left", 
    // position : "absolute"
  },
  switchPicBtn : {
    height:40 , 
    width:110, 
    backgroundColor: "rgb(255 , 250 , 250)" , 
    // backgroundColor : "transparent",
    color:"white" , 
    // border: "none" , 
    padding: "5%",
    borderTopColor : "rgb(0 , 0 , 0)",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomColor: "transparent",
    borderTopLeftRadius : 20, //////afas/fas/fa/
    borderTopRightRadius : 25, /////asfasfasfsd
  },
  switchPicBtnText : {
    fontSize: 20 ,
    color : "blue" ,
    paddingLeft : 10
  },
  card: {
    flexWrap : "wrap",
    flexDirection : "column",
    borderRadius: 2,
    marginTop: 70 ,
    height: 500,
    width: 900,
    // boxShadow: "0 3px 6px #999, 0 3px 6px #999",
    textAlign: "left",
    // float: "left",
    position: "absolute",
    // marginBottom: "20%",
    // marginTop: "1%",
    // marginLeft: "7.5%",
    // marginRight: "5%",
    // backgroundColor: "rgb(255 , 250, 250)"
  },
  imgContainer: {
    // backgroundColor: "transparent",
    height: "60%",
    width : 350,
    overflow: "hidden",
    textAlign: "center",
    borderColor: "rgb(0 , 0, 0)",
    borderWidth: 1,
    borderStyle: "solid",

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
    borderStyle: "solid",
    backgroundColor : "rgb( 255 , 250 ,250)",
    flexDirection : "column",
    height : 90
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

