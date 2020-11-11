import React, { useState , useContext, useEffect  } from "react";
import Col from "../Col";
import { StyleSheet, Text, View , Image, Button , Platform } from 'react-native';
import UserContext from "../../utils/UserContext";
// import "../../assets/images/man-for-test.jpeg";
// import "../../assets/images/corgi-for-test.png";
// import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import FastImage from "react-native-fast-image";

import CustomImage from "../CustomImage";



export default function Card(props) {
  const { currentUser , userPhotoLink , petPhotoLink } = useContext(UserContext)
  const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
  const [petPhotoLoaded, setPetPhotoLoaded] = useState(true)
  const [userPhoto , setUserPhoto] = useState()
  const [petPhoto , setPetPhoto] = useState()
  const [convertToUrl , setConverToUrl] = useState("")
  const [convertToUrlTwo , setConverToUrlTwo] = useState("")
  const [ isLoading , setIsLoading] = useState(true)
  // useEffect(() => {
  //   getFirebasePhotos()
  //   getFirebasePhotosTwo()
  // },[]
  // )
  // console.log(currentUser , "current user card")

  // const getFirebasePhotosTwo = async () => {
  //   await firebase.firestore().collection('usersPhotos/').doc('userPhoto').get().then(doc => {
  //       setUserPhoto(doc)
  //   })
  // }
  // const getFirebasePhotos = async () => {
  //   await firebase.firestore().collection('petPhotos/').doc('petPhoto').get().then(doc => {
  //      setPetPhoto(doc)
  //   })
  // }
  // getFirebasePhotos()
  // getFirebasePhotosTwo()

  useEffect(() => {
    getandLoadPhotoURL()
    getandLoadPhotoURLTwo()
    // yourImage()
  },[]
  )

  const getandLoadPhotoURL = () => {
    const ref = firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/usersPhotos/${props.email}-userPhoto`)
    ref.getDownloadURL().then(data => {
        setConverToUrl(data)
        setIsLoading(false)
        // require()
    })
    .catch(error => {
      setConverToUrl("/images/logoblue.jpg" )
      setIsLoading(false)
      console.log(error)
    })
  }

  const getandLoadPhotoURLTwo = () => {

    const ref = firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/petPhotos/${props.email}-petPhoto`)
    ref.getDownloadURL().then(data => {
        setConverToUrlTwo(data)
        setIsLoading(false)
        // require()
    })
    .catch(error => {
      setConverToUrlTwo("/images/logoblue.jpg" )
      setIsLoading(false)
      console.log(error)
    })
    
  }

  // const yourImage = () => (
  //   <FastImage
  //   style={styles.cardImage}
  //   source={{
  //     uri : convertToUrl.toString(),
  //     priority : FastImage.priority.normal
  //   }}
  //   resizeMode={FastImage.resizeMode.contain}
  //   />
  // )
    
 

  function switchPictures(){
    // if(props.img2 === undefined){
    //   setUserPhotoLoaded(false)
    //   return(
    //    <Text> Loading </Text>
    //   )
    // }
     {
      // setUserPhoto(props.img2)
      // setUserPhoto(photoOne)
      setUserPhotoLoaded(true)
      setPetPhotoLoaded(false)
      // console.log(PhotoOne)
      console.log(petPhotoLink)
    }
  }
  function switchPicturesTwo(){
    if(petPhotoLoaded === false){
      setPetPhotoLoaded(true)
      console.log(userPhotoLink)
    }
  }

  if(isLoading === true) {
    return (
      <View><Text>Loading</Text></View>
    )
  }



  if(isLoading === false) {
  if(petPhotoLoaded === true){
    return (
      <>
      <View style={styles.someMargin}>
        <View style={styles.switchPicBtnDiv}>
          <View style={styles.altswitchPicBtn} >
          <Button title="User Photo" onPress={switchPictures}>
          </Button>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.imgContainer}>
        

<CustomImage
style={{height : 300 , width : 400  , resizeMode : "contain"}}
  source={{
    uri : convertToUrl
  }}



/>


{/* 
            <Image style={styles.cardImage}
            alt={props.petName} 
            // source={{uri : convertToUrl}}
            source = {{uri : `https://firebasestorage.googleapis.com/v0/b/canine-cupid-img-storage.appspot.com/o/usersPhotos%2FL$%${props.email}7D-userPhoto?alt=media&token=1d5437c0-7bbb-4909-b1cd-9620a580167d`}}

            // source = {{uri : `gs://canine-cupid-img-storage.appspot.com/petPhotos/${props.email}-petPhoto`}}
            // source = {require("gs://canine-cupid-img-storage.appspot.com/petPhotos/" + petPhotoLink + "-petPhoto")}
            // loadingIndicatorSource = {require(url)}
            // source={petPhoto} 
            /> */}



          </View>
          <View style={styles.contentCard}>
          <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {props.userName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Email: {props.email} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> City: {props.city} </Text>
          </View>
        </View>
      </View>
      </>
    );
  }
  if(userPhotoLoaded === true){
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

        <CustomImage
style={{height : 300 , width : 700}}
  source={{
    uri : convertToUrlTwo
  }}



/>




{/* 
            <Image style={styles.cardImage} 
            alt={props.userName} 
            source={{ uri : props.userPhotoUrl }} 
            // source={userPhoto } 
            /> */}
          </View>
          <View style={styles.contentCard}>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Name: {props.petName} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Breed: {props.breed} </Text>
           <Text style={{fontSize:20 , fontWeight:"bold"}}> Age: {props.age} </Text>

          </View>
          </View>
      </Col>
      </View>
      
    );
  }


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
    height : "100%"  , 
    width : "100%"   ,
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