import React, { useState } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button } from 'react-native';

function CardTwo(props) {
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  function switchPictures(){
    console.log(props , "hello")
    if(props.img2 === undefined){
      setUserPhotoLoaded(false)
      return(
        <div>Loading</div>
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
      <Col size="md-6">
        <View style={styles.imgContainer}>
            {/*  may need to change button style     */}
          <Button onClick={switchPictures} style={{height:"50px" , width:"128px", backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:"25px" , padding: "5%"}}>{props.message}</Button></View>
          <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image style={styles.cardImage} alt={props.userName} src={props.img1} />
            </View>
            <View style={styles.contentCard}>
          <Text> {props.children} </Text>
          </View>
          </View>
      </Col>
    );
  } if(userPhotoLoaded === true){
    console.log(props)
    return (
      <Col size="md-6">
          <View style={styles.imgContainer}>
            {/*  may need to change button style     */}
        <Button onClick={switchPicturesTwo} style={{height:"50px" , width:"128px", backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:"25px" , padding: "5%"}}>{props.messageTwo}</Button>
        </View>
        <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image alt={props.userName} src={props.img2} />
            </View>
          <View style={styles.contentCard}>
          <Text> {props.children} </Text>
          </View>
          </View>
      </Col>
    );
  }
}


const styles = StyleSheet.create ({
  switchPicBtnDiv: {
    width: "20%" , 
    // float:"left", 
    marginLeft:"8.2%"
  },
  switchPicBtn : {
    height:"50px" , 
    width:"128px", 
    backgroundColor:"rgb(232, 86, 86)" , 
    color:"white" , 
    // border: "none" , 
    fontSize:25 , 
    padding: "5%"
  },
  card: {
    borderRadius: 2,
    height: "425px",
    width: "500px",
    // boxShadow: "0 3px 6px #999, 0 3px 6px #999",
    textAlign: "left",
    // float: "left",
    position: "relative",
    marginBottom: "20%",
    marginTop: "1%",
    marginLeft: "7.5%",
    marginRight: "5%"
  },
  imgContainer: {
    // backgroundColor: "transparent",
    height: "60%",
    overflow: "hidden",
    textAlign: "center"
  },
  userPhotoLoaded : {
    width: "20%" , 
    // float:"left", 
    marginLeft:"8.2%"
  },
  contentCard : {
    fontSize : 16
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

