import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import { LoginButton, SignupButton } from "../components/Button";
// import DogLogin from "./images/dog-for-login.png";
// import LoginText from "./images/login-text.png";
import { Text, TextInput, View, StyleSheet} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { ScrollView} from "react-native-gesture-handler";
import * as firebase from "firebase";


export default function Login(props) {
  const history = useHistory();
  const { getDataAfterLogin, currentUser, authorizedUserToken , userPhotoUrlLink , petPhotoUrlLink } = useContext(UserContext)
  const { control} = useForm();
  // Refs for focus
  const userNameInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const navigation = useNavigation()
  // Firebase Refs
  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [usersUid, SetUsersUid] = useState("")
  const [finalUserObject , setFinalUserObject] = useState()


  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  const firebaseUserLogin = () => {
    firebase.auth().signInWithEmailAndPassword(Email, Password).then(user => {
      return user.user.getIdToken().then(idToken => {
        // const csrfToken = getCookie('csrfToken')
        // return postIdTokenToSessionLogin( '/sessionLogin' , idToken , csrfToken)
        console.log(idToken)
        return API.sessionLogin({
          idToken: idToken
        })
        // return postIdTokenToSessionLogin( '/sessionLogin' , idToken)
      });
    })
    .then(getUserDataFromFirestore)
  }

  const getUserDataFromFirestore = async () => {
    const db = firebase.firestore().collection('users')
    await db.where ("email" , "==" , Email).get()
    .then((snap) => {const items = snap.docs.reduce((res , item) => ({...res , [item.userName]: item.data() }),
    {}
    )
      getDataAfterLogin(items.undefined)
    })
    .then(() => {
      authorizedUserToken(true)
    })
    .finally(getUserPhotos)
  }

  const getUserPhotos = async () => {
    const userPhotoFromStorage = await firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/usersPhotos/${Email}-userPhoto`).getDownloadURL()
    .then((res) => console.log(res , "this should be photo from storage"))
console.log(userPhotoFromStorage )
// userPhotoUrlLink(userPhotoFromStorage)
    // .then((res) => userPhotoUrlLink(res))
    // .then(getPetPhotos)
    getPetPhotos()
    // .then(getDataAfterLogin(finalUserObject))
    // .then(getDataAfterLogin(finalUserObject.items.undefined))
    // console.log(userPhotoFromStorage , "user photo from storage")
    // console.log(currentUser , "this shold be current user")
    // .then(() => {
    //   authorizedUserToken(true)
    // })
    // .then(navigation.navigate('profile') )
  }

  const getPetPhotos = async () => {
    const petPhotoFromStorage = await firebase.storage().refFromURL(`gs://canine-cupid-img-storage.appspot.com/petPhotos/${Email}-petPhoto`).getDownloadURL()
    .then((res) => petPhotoUrlLink(res))
    .then(navigation.navigate('profile'))
  }
  // console.log(finalUserObject , "final user object")
  // console.log(currentUser, "this is current user")

  function handleAuthenticatedResponse(res) {
    if (res.data === "User not found.") {
      // let errorMsg = "User Not Found!";
      console.log("wrong username")
      // showModal(errorMsg);
    } else if (res.data === "Wrong password.") {
      // let errorMsg = "Password is Wrong!";
      console.log("wrong password")
    } else {
      console.log("res.data", res.data);
      getData(res.data);
      getAllNames(res.data.sessionToken, res.data.matchesYes, res.data.matchesNo);
      navigation.navigate('profile')
    };
  };
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.mainCont}>
        <View style={styles.headerCont}>
          <Text style={styles.ccHeader}>Canine Cupid</Text>
          {/* <Header /> */}
        </View>
        <View style={styles.userNameCont} >
          <Controller
            name="userName"
            defaultValue="none"
            control={control}
            onFocus={() => {
              userNameInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                style={styles.TextInputStuff}
                onBlur={onBlur}
                ref={userNameInputRef}
                placeholder="Username"
                onChangeText={userNameInput =>
                  SetEmail(userNameInput)
                }
              />}
          />
          <Controller
            name="password"
            defaultValue="none"
            control={control}
            onFocus={() => {
              passwordInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                style={styles.TextInputStuffTwo}
                onBlur={onBlur}
                ref={passwordInputRef}
                placeholder="Password"
                onChangeText={passWordInput =>
                  SetPassword(passWordInput)
                }
              />}
          />
        </View>
        <View style={styles.loginBtn}>
          <LoginButton
            // disabled={!(data.userName && data.password)}
            onPressOfBtn={firebaseUserLogin} // use this one at the end of the day
          />
          <View style={styles.signUpBtn}>
            <SignupButton />
          </View>
          {/* <AboutUsButton /> */}
        </View>
        {/* <TabBar /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainCont: {
    // backgroundColor: "rgb(232, 86, 86)",
    height: 820,
    // minHeight : 1000,
    // minWidth: 1000
  },
  // headerCont: {
  //   flex: 4,
  //   height: "50%",
  //   width: "100%"
  // },
  ccHeader: {
    fontSize: 50,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 70
  },
  userNameCont: {
    flex: 3
  },
  // button: {
  //   height: "60%",
  //   width:"40%"
  // }, 
  touchView: {
    backgroundColor: "rgb(80, 86, 86)"
  },
  TextInputStuff: {
    // backgroundColor: "rgb(255 , 250, 250)",
    width: "80%",
    height: "15%",
    borderRadius: 3,
    marginLeft: 50,
    marginTop: -10,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb( 0 , 0 , 0 )",
    borderBottomWidth: 2,
    fontSize: 20
    // marginTop: -80
  },
  TextInputStuffTwo: {
    // backgroundColor: "rgb(255 , 250, 250)",
    width: "80%",
    height: "15%",
    borderRadius: 3,
    marginLeft: 50,
    marginTop: 55,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgb( 0 , 0 , 0 )",
    borderBottomWidth: 2,
    fontSize: 20,
    // marginTop: -80
  },
  loginBtn: {
    color: "rgb( 0 , 0 ,0)",
    height: "20%",
  }
})