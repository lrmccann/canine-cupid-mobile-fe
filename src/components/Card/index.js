import React, { useState , useContext  } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button , Platform } from 'react-native';
import UserContext from "../../utils/UserContext";
import "../../assets/images/man-for-test.jpeg";
import "../../assets/images/corgi-for-test.png";
import * as ImagePicker from 'expo-image-picker';


export default function Card(props) {
  const photoOne = require("../../assets/images/man-for-test.jpeg")
  const photoTwo = require("../../assets/images/corgi-for-test.png")
  const [userPhoto , setUserPhoto] = useState()
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  const { user } = useContext(UserContext)
 

  function switchPictures(){
    // if(props.img2 === undefined){
    //   setUserPhotoLoaded(false)
    //   return(
    //    <Text> Loading </Text>
    //   )
    // }
     {
      // setUserPhoto(props.img2)
      setUserPhoto(photoOne)
      setUserPhotoLoaded(true)
      setPetPhotoLoaded(false)
      // console.log(PhotoOne)
    }
  }
  function switchPicturesTwo(){
    if(petPhotoLoaded === false){
      setPetPhotoLoaded(true)
    }
  }
  if(petPhotoLoaded === true){
    return (
      <View style={styles.someMargin}>
        <View style={styles.switchPicBtnDiv}>
          <View style={styles.altswitchPicBtn} >
          <Button title="User Photo" onPress={switchPictures}>
          </Button>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image style={styles.cardImage}
            alt={props.petName} source={{
              uri : user.setUserPhotoUrl.uri
              
              }}
            // src={props.petPhotoUrl} 
            />
          </View>
          <View style={styles.contentCard}>
          <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {user.userName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Email: {user.email} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> City: {user.city} </Text>
          </View>
        </View>
      </View>
    );
  } if(userPhotoLoaded === true){
    return (
      <View style={styles.someMargin}>
      <Col size="md-6">
      <View style={styles.switchPicBtnDiv}>
        <View style={styles.altswitchPicBtn}>
        <Button title="Pet Photo" onPress={switchPicturesTwo} style={{height:"20%" , width:"20%", backgroundColor:"rgb(232, 86, 86" , color:"white"  , fontSize:25 , padding: "5%"}}></Button>
        </View>
        </View>
        <View style={styles.card}>
        <View style={styles.imgContainer}>
            <Image style={styles.cardImage} alt={props.userName} source={photoTwo} />
          </View>
          <View style={styles.contentCard}>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {user.petName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Breed: {user.breed} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Age: {user.age} </Text>

          </View>
          </View>
      </Col>
      </View>
    );
  }

}

const styles = StyleSheet.create ({
  someMargin: {
    alignContent:"center",
    marginTop: "5%"
    
  },
  switchPicBtnDiv: {
    // height : 50,
    width: "20%" , 
    backgroundColor : "rgb(255 , 250, 250)",
    // float:"left", 
    // marginLeft:"14%",
    borderTopColor : "rgb(0 , 0 , 0)",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomColor: "transparent",
    fontSize:25, 
    // marginLeft : 285
    borderTopLeftRadius : 20, //////afas/fas/fa/
    borderTopRightRadius : 25, /////asfasfasfsd
    marginLeft : "72%"
  },
  switchPicBtn : {
    marginLeft : "72%",
    height:20 , 
    width:"20%", 
    backgroundColor:"rgb(255, 250, 250)" , 
    // color:"white" , 
    borderColor: "rgb(0 , 0 , 0)" , 
    fontSize:25 , 
    borderTopLeftRadius : 20, //////afas/fas/fa/
    borderTopRightRadius : 25, /////asfasfasfsd
  },
  card: {
    // marginLeft:"25%",
    borderRadius: 2,
    height: 350,
    width: 350,
    // boxShadow: "0 3px 6px #999, 0 3px 6px #999",
    textAlign: "left",
    // float: "left",
    position: "relative",
    marginBottom: "4%",
    borderStyle: "solid",
    // marginTop: "1%",
    borderWidth: 1,
    borderTopColor: "rgb(0 , 0, 0)",
    backgroundColor: "rgb( 250, 250 , 250)", // black
    // marginLeft: 12
    marginLeft : "7.5%",

  },
  imgContainer: {
    backgroundColor: "rgb(255 , 250, 250 )", // gray
    height: "60%",
    width: "100%",
    overflow: "hidden",
    textAlign: "center"
  },
  cardImage : {
    height : 100 , 
    width : 100,
    },
  userPhotoLoaded : {
    width: "20%" , 
    // float:"left", 
    marginLeft:"8.2%"
  },
  contentCard : {
    fontSize : 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderTopColor: "rgb(0 , 0, 0)",
    borderLeftColor : "transparent",
    borderRightColor : "transparent",
    borderBottomColor : "transparent",
    backgroundColor: "rgb( 250, 250 , 250)", // black,
    height: "40%",
    justifyContent:"space-around",
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