import React, { useContext, useEffect, useState } from "react";
import { Row, Container } from "../components/Grid";
import Navbar from "../components/Navbar";
import Col from "../components/Col";
import MatchCards from "../components/MatchCards";
import { MessageButton } from "../components/Button";
import "../components/MatchCards/images/small-profile-pic-one.png";
import Map from "../components/map";
import UserContext from "../utils/UserContext";
import { StyleSheet, Text, View , Image, ScrollView } from 'react-native';
import {  TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import CustomImage from "../components/CustomImage";
import firebase from "firebase";



export default function UsersDetails (props) {

    const { getSelectedUser } = useContext(UserContext)
    const [convertToUrl , setConverToUrl] = useState("")
    const [convertToUrlTwo , setConverToUrlTwo] = useState("")
    const [ isLoading , setIsLoading] = useState(true)


    useEffect(()=> {
        getAndLoadPhotoUrl()
        getAndLoadPhotoUrlTwo()
    })

    const getAndLoadPhotoUrl = () => {
        const ref = firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/usersPhotos/${getSelectedUser.email}-userPhoto`)
        ref.getDownloadURL().then(data => {
            setConverToUrl(data)
            setIsLoading(false)
        })
        .catch(error => {
          setConverToUrl("/images/logoblue.jpg" )
          setIsLoading(false)
          console.log(error)
        })
      }

      const getAndLoadPhotoUrlTwo  = () => {
        const ref = firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/petPhotos/${getSelectedUser.email}-petPhoto`)
        ref.getDownloadURL().then(data => {
            setConverToUrlTwo(data)
            setIsLoading(false)
        })
        .catch(error => {
          setConverToUrlTwo("/images/logoblue.jpg" )
          setIsLoading(false)
          console.log(error)
        })
        
      }



    console.log(getSelectedUser , " i am selected user")

    return (
        <ScrollView
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        >
            <View style={styles.usersDetailCont}>
                <View style={styles.detailBox}>
                    <View style={styles.petCoverPhotoView}>
                        <CustomImage 
                        style={ styles.petCoverPhotoViewImage}
                        source={{
                            uri : convertToUrlTwo
                        }}
                        />
                        <View style={styles.userPhotoView}>
                            <CustomImage 
                            style={styles.userPhotoViewImage }
                            source={{
                                uri : convertToUrl
                            }}
                            />
                        </View>
                    </View>
                    <View style={styles.userNameView}><Text style={{fontSize : 25 , fontWeight : "bold"}}>{getSelectedUser.userName}</Text></View>
                    <View style={styles.contactBar}>
                        <View style={styles.messageBtn}>
                        <TouchableWithoutFeedback
                        // onPress={openFirebaseMessenger}
                        >
                            <Text style={{color : "rgb(255 , 250 ,250)" , fontSize : 23 , alignSelf : "center" , marginTop : 8.5}}>Message</Text>
                        </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.moreInfo}>
                            <TouchableWithoutFeedback
                            // onPress={openMoreOptions}
                            >
                                <Text style={{fontSize : 28 , alignSelf : "center"}}>...</Text>
                            </TouchableWithoutFeedback>

                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.morePhotos}>
                    <ScrollView
                    horizontal={true}
                    scrollToOverflowEnabled={true}
                    scrollEnabled={true}
                    snapToStart={false}
                    showsHorizontalScrollIndicator={true}
                    >
                            <View style={styles.morePhotosImages}></View>
                            <View style={styles.morePhotosImages}></View>
                            <View style={styles.morePhotosImages}></View>
                            <View style={styles.morePhotosImages}></View>
                            <View style={styles.morePhotosImages}></View>
                    </ScrollView>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.boxHoldingInfo}>
                        <View><Text style={styles.userInfoText}>Pet name : {getSelectedUser.petName}</Text></View>
                        <View><Text style={styles.userInfoText}>Breed : {getSelectedUser.breed}</Text></View>
                        <View><Text style={styles.userInfoText}>Age : {getSelectedUser.age}</Text></View>
                        <View><Text style={styles.userInfoText}>Trained : {getSelectedUser.trained}</Text></View>
                        <View><Text style={styles.userInfoText}>Vaccinated : {getSelectedUser.vaccinated}</Text></View>
                        <View style={styles.aboutUser}><Text style={styles.bioText}>More info : {getSelectedUser.info}</Text></View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.boxHoldingUserInfo}>
                        <View><Text style={styles.userInfoText}>User Name : {getSelectedUser.userName}</Text></View>
                        <View><Text style={styles.userInfoText}>Email : {getSelectedUser.userName}</Text></View>
                        <View><Text style={styles.userInfoText}>Location : {getSelectedUser.city} , {getSelectedUser.zipCode} </Text></View>


                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    // page display
    usersDetailCont: {
      height: 1250,
      width: "100%"
    },
    // container for actual content
    detailBox : {
        height : 700,
        width : 400,
        // backgroundColor : "rgb(232, 86, 86)",
        // backgroundColor : "rgb(255 , 250 , 250)" ,
        marginTop : 20,
        marginLeft : 7
    },
    // cover photo
    petCoverPhotoView : {
        height : "30%",
        width : "95%",
        alignSelf : "center",
        // marginTop : 15,
        backgroundColor : "rgb(90 ,90, 90)",
        borderTopLeftRadius : 15 ,
        borderTopRightRadius : 15
    },
    petCoverPhotoViewImage : {
        height : "100%",
        width : "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius : 15
    },
    // circular photo of user
    userPhotoView : {
        height : "65%",
        width : "37%",
        backgroundColor : "rgb(90 , 200 , 130)",
        borderRadius : 140,
        borderStyle : "solid" ,
        borderWidth : 10,
        borderColor : "rgb(255 ,250 ,250)",
        alignSelf : "center",
        marginVertical : 140,
        position : "absolute"
    },
    userPhotoViewImage : {
        height : "100%",
        width : "100%",
        borderRadius : 140
    },
    // contact bar holding : messageBtn & more info
    contactBar : {
        height : "7%",
        width : "95%",
        alignSelf :"center",
        justifyContent : "center",
        marginTop : "6%",
        // paddingLeft : "35.5%" ,
        borderRadius : 8 ,
        // backgroundColor : "rgb(51 , 170 , 90)",
        display : "flex"
    },
    moreInfo : {
        width : "15%",
        height : "100%",
        backgroundColor: "rgb(170 , 170 , 170 )",
        left  : 323,
        borderRadius : 8
    },
    messageBtn : {
        width : "82%",
        height : "100%",
        backgroundColor : "rgb(232 , 86 , 86)",
        borderRadius : 8,
        marginBottom : "auto"
    }, 
    // hold more photos 
    morePhotos : {
        display : "flex",
        flexDirection : "row",
        marginTop : 16 ,
        height : "18%",
        width : "100%",
        // backgroundColor : "rgb(40 , 40 ,40)",
        padding : 8,
        
    },
    morePhotosImages : {
        height : "90%",
        width : "100%",
        backgroundColor : "rgb(180 , 180 , 180)",
        borderRadius : 10,
        marginTop : 4.2,
        marginLeft : 5,
        marginRight : 12
    },
    // line to seperate content
    line : {
        width : "95%" ,
        borderWidth : 1 , 
        borderStyle : "solid" ,
         borderColor : "rgb(190 , 190 ,190)",
         marginTop : 16,
         alignSelf : "center"
    },
    userNameView : {
        // backgroundColor : "rgb( 232, 86 , 86)",
        width : "70%",
        height : "7%", 
        marginTop : 85,
        alignSelf : "center",
        // justifyContent : "center",
        paddingLeft : 51
    },
    boxHoldingInfo : {
        backgroundColor : "rgb( 232, 86 , 86)",
        width : "95%",
        height : "37%",
        borderRadius : 20,
        padding : 10,
        alignSelf : "center",
        marginTop : 20,
        padding : 20
    },
    userInfoText : {
        fontSize : 18,
        color: "rgb(255 , 250 ,250)",
        marginBottom : 10
    },
    bioText : {
        fontSize : 16,
        color : "rgb(255 , 250, 250)",
        // alignSelf : "center",
        marginTop : 8
    },
    boxHoldingUserInfo : {
        backgroundColor : "rgb( 232, 86 , 86)",
        width : "95%",
        height : "35%",
        borderRadius : 20,
        padding : 20,
        alignSelf : "center",
        marginTop : 20
    }
  })