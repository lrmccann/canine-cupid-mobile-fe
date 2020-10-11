import React, { useState } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button } from 'react-native';


export default function Card(props) {
  const [userPhoto , setUserPhoto] = useState()
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  console.log(props)
  function switchPictures(){
    // if(props.img2 === undefined){
    //   setUserPhotoLoaded(false)
    //   return(
    //    <Text> Loading </Text>
    //   )
    // }
     {
      setUserPhoto(props.img2)
      setUserPhotoLoaded(true)
      setPetPhotoLoaded(false)
      console.log(props.img2)
    }
  }
  function switchPicturesTwo(){
    if(petPhotoLoaded === false){
      setPetPhotoLoaded(true)
    }
  }
  if(petPhotoLoaded === true){
    return (
      <View>
      <Col size="md-6">
        <View style={styles.switchPicBtnDiv}>
          <View style={styles.altswitchPicBtn} >
          <Button title="User Photo" onPress={switchPictures}>{props.message}
          </Button>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image style={styles.cardImage}
            alt={props.petName} source={require('../../assets/images/dog-for-login.png')}
            // src={props.petPhotoUrl} 
            />
          </View>
          <View style={styles.contentCard}>
          <Text> {props.children} </Text>
          </View>
        </View>
      </Col>
      </View>
    );
  } if(userPhotoLoaded === true){
    return (
      <View>
      <Col size="md-6">
      <View style={styles.switchPicBtnDiv}>
        <View style={styles.altswitchPicBtn}>
        <Button title="Pet Photo" onPress={switchPicturesTwo} style={{height:"50px" , width:"128px", backgroundColor:"rgb(232, 86, 86" , color:"white" , border: "none" , fontSize:25 , padding: "5%"}}>{props.messageTwo}</Button>
        </View>
        </View>
        <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image style={styles.cardImage} alt={props.userName} src={userPhoto} />
          </View>
          <View style={styles.contentCard}>
           <Text> {props.children} </Text>
          </View>
          </View>
      </Col>
      </View>
    );
  }

}

const styles = StyleSheet.create ({
  switchPicBtnDiv: {
    // height : 50,
    width: "20%" , 
    backgroundColor : "rgb(255 , 250, 250)",
    // float:"left", 
    marginLeft:"8.2%",
    borderTopColor : "rgb(0 , 0 , 0)",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomColor: "transparent",
    fontSize:25, 
    marginLeft : 285
  },
  switchPicBtn : {
    height:20 , 
    width:60, 
    backgroundColor:"rgb(255, 250, 250)" , 
    // color:"white" , 
    borderColor: "rgb(0 , 0 , 0)" , 
    fontSize:25 , 
  },
  card: {
    borderRadius: 2,
    height: 350,
    width: 350,
    // boxShadow: "0 3px 6px #999, 0 3px 6px #999",
    textAlign: "left",
    // float: "left",
    position: "relative",
    marginBottom: "20%",
    // marginTop: "1%",
    backgroundColor: "rgb( 0 , 0 , 0)", // black
    marginLeft: 12
  },
  imgContainer: {
    backgroundColor: "rgb(255 , 250, 250 )", // gray
    height: "60%",
    overflow: "hidden",
    textAlign: "center"
  },
  cardImage : {
    height : 20 , 
    width : 20
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

})



// .card > .content {
//   padding-left: 1rem;
//   padding-right: 1rem;
//   font-size: 10px;
// } 