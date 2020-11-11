import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import UserContext from "../utils/UserContext"
// import { Col, Row, Container } from "../components/Grid";
// import { Input, TextArea, FormBtn } from "../components/Form";
// import Modal from 'react-bootstrap/Modal';
// import { ModalButton } from "../components/Button";
// import RadioButton from "../components/RadioButton"
// import {NavbarSignUp}from "../components/Navbar";
// import  CheckBox   from '@react-native-community/checkbox';
import Header from "../components/Header";
import { Text, TextInput, View, StyleSheet, ScrollView, Button, Alert , Platform   } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
// import ImagePickerExample from "../components/ImageSelector/ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import {withFirebaseHOC} from "../../Firebase";
import Firebase from "../../Firebase";


  function Signup() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { currentUser , authorizedUserToken , getDataAfterLogin } = useContext(UserContext)
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const { control, handleSubmit, getValues, setValue, register } = useForm();
  const history = useHistory();
  // Refs for focus
  const userNameInputRef = React.useRef();
  const passwordInputRef = React.useRef();
  const petNameInputRef = React.useRef();
  const zipecodeInputRef = React.useRef();
  const cityInputRef = React.useRef();
  const breedInputRef = React.useRef();
  const ageInputRef = React.useRef();
  const emailInputRef = React.useRef();
  const petPhotoUrlInputRef = React.useRef();
  const userPhotoUrlInputRef = React.useRef();
  const infoInputRef = React.useRef();
  const navigation = useNavigation()
  // checkbox consts
  const [checkVaccinated, setCheckVaccinated] = useState(false)
  const [checkTrained, setCheckTrained] = useState(false)
  const [checkPark, setCheckPark] = useState(false)
  const [checkBall, setCheckBall] = useState(false)
  const [checkFrisbee, setCheckFrisbee] = useState(false)
  const [checkPupCup , setCheckPupCup] = useState(false)
// const for firebase
  const [imageOne, setImage] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [Email , setEmail] = useState("")
  const [Password , setPassword] = useState("")
  const [Age , setAge] = useState("")
  const [ZipCode , setZipCode] = useState("")
  const [petName , SetPetName] = useState("")
  const [PetPhotoUrl , SetPetPhotoUrl] = useState("")
  const [UserPhotoUrl , SetUserPhotoUrl] = useState("")
  const [Breed , SetBreed] = useState("")
  const [Info , SetInfo] = useState("") 
  const [City , SetCity] = useState("")
  const [UserName , SetUserName] = useState("")



useEffect(() => {
  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // console.log(storage)
  })();
}, []);

const pickImage = async data => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    // setImage(result.uri)
    uploadImage(result.uri , `${Email}-userPhoto` )
    .catch((error) => {
      console.log(error)
    })
    // .then(() =>{
    //   Alert.alert("success")
    // })
    // .catch((error)=> {
    //   Alert.alert(error);
    // })
  }
};
const pickImageTwo = async data => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    uploadImageTwo(result.uri , `${Email}-petPhoto` )
    .catch((error) => {
      console.log(error)
    })
  }
};
  const uploadImage = async (uri , imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
    // const storage = firebase.firestore()

    var ref =  firebase.storage().ref("usersPhotos/" + imageName)
    setImage(imageName)
    return ref.put(blob);
  }

  const uploadImageTwo = async (uri , imageName) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
    // const storage = firebase.firestore()

    var ref =  firebase.storage().ref("petPhotos/" + imageName)
    setImageTwo(imageName)
    return ref.put(blob);
  }

  const fieldValidation = () => {
    let validEmailFormat = validEmailRegex.test(Email)
    let userNameValid =(UserName.length > 4 && UserName.length < 21)
    let passwordValid = (Password.length > 4 && Password.length < 21)
    let emailValid = (Email.length > 0 && validEmailFormat)
    let petNameValid =  (petName)    
    console.log("valids", userNameValid, passwordValid, emailValid, petNameValid) 
    let fieldsValid = userNameValid && passwordValid && emailValid && petNameValid
    if(!fieldsValid){
      console.log("Please fill out all required fields")
      return false
    }else{
      return true
    }
  }
  
  async function handleOnSignup () {
    let validForms = fieldValidation();
    if(validForms === true){
    // await Firebase.signupWithEmail(Email , Password)
    await firebase.auth().createUserWithEmailAndPassword(Email , Password)
  //   .then((snap) => {const items = snap.docs.reduce((res , item) => ({...res , [item.useName] :item.data() }),
  //   {}
  //   )
  //   getDataAfterLogin({items})
  // })
    .then(createUser)
    }else{
      console.log("Error, please try again")
    }
  }
  async function createUser () {
    const userData = ({"email" : Email , "password" : Password , "age": Age ,
    "zipCode" : ZipCode , "petName" : petName , "petPhotoUrl": PetPhotoUrl , "userPhotoUrl": UserPhotoUrl ,
    "breed": Breed ,"info" : Info , "city": City , "userName": UserName})
    const db = firebase.firestore().collection('users')
    await db.add(userData)
    .then(getDataAfterLogin(userData))
    .then(()=> {
      authorizedUserToken(true)
    })
    // .then(getUserForNextPage)
    // .then(createAdminUser)
    //.then(getAllNames()) ////////// get all usernames from firebase and then we filter through them and pull out users in yes and no array
    //.then(getData())     ///////// get the username, password and session token from firebase
    .then(navigation.navigate('profile'))
  }
console.log(currentUser)
  // const getUserForNextPage = async () => {
  //   const db = firebase.firestore().collection('users')
  //   await db.where ("email" , "==" , Email).get()
  //   .then((snap) => {const items = snap.docs.reduce((res , item) => ({...res , [item.userName] : item.data()}),
  //   {}
  //   )
  // getDataAfterLogin({items})
  // console.log(currentUser , "user for next page")
  // })
  // }

  const getAllNames = async (sessionToken, arrYes ) => {
    console.log("getAllNames")
    await API.getAllUsers(sessionToken)
      .then((res) => {
        //  arr1 of all users Names received in response get filtered to exclude Logged user from the array, result in arr2
        const arr1 = res.data;
        function checkUserName(name) {
          // if (name !== formObject.userName) {
            return name;
          // }
        }
        const arr2 = arr1.filter(checkUserName)

        // arrYes conteined users name mutched by Loged user, all those name should be exlused from arr2, result in data
        const filteredNames = function () {
          const arr3 = arr2.filter(e => arrYes.findIndex(i => i === e) === -1);
          return arr3;
        };

        const data = filteredNames();

        getAllUsersNames(data)
      }
      )
  }

  function handleSignupResponse(res) {
    console.log("res.data", res.data)
    if (res.data === "User name already taken.") {
      let errorMsg = res.data;
      showModal(errorMsg);
    } else {
      console.log("res.data", res.data)
      getData(res.data);
      getAllNames(res.data.sessionToken, res.data.matchesYes);
      navigation.navigate('profile')
    };
  };
  return (
    <ScrollView
    showsVerticalScrollIndicator ={false}
    showsHorizontalScrollIndicator={false}
    >
      {/* <ImagePickerExample /> */}
      <View style={styles.signupCont}>
        {/* <View style={styles.header}> */}
        {/* <Header /> */}
        <Text style={styles.signUpHeader}>Sign Up</Text>
        <View style={{marginBottom : 20 , backgroundColor: "rgb(232, 86, 86)" , width : "98%"  , height : 60 , borderRadius: 10 , marginLeft : 4 }}>
        {/* <View style={{ borderTopColor : "transparent", borderLeftColor : "transparent", borderRightColor : "transparent", borderBottomColor : "rgb( 0 , 0 , 0 )", borderBottomWidth : 2, width : "40%"}}> */}
        <Text style={{ fontSize: 30 , color : "white" , textAlign : "center" , paddingTop : 10 }}>User Info</Text>
        {/* </View> */}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.categoryText}>Username</Text>
          <Controller
            name="userName"
            defaultValue=""
            control={control}
            onFocus={() => {
              userNameInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={userNameInputRef}
                style={styles.userInfoInput}
                onChangeText={userName =>
                  SetUserName(userName)
                }
              />}
          />
          <Text style={styles.categoryText}>Password</Text>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            onFocus={() => {
              passwordInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
            
              <TextInput
                onBlur={onBlur}
                ref={passwordInputRef}
                style={styles.userInfoInput}
                onChangeText={password =>
                  // onChange(value)
                  setPassword(password)
                }/>}
          />
          <Text style={styles.categoryText}>User photo</Text>
          <Controller
            name="userPhotoUrl"
            defaultValue=""
            control={control}
            onFocus={() => {
              userPhotoUrlInputRef.current.focus()
            }}
            render={({onBlur , value}) => 
            <View style={styles.slctPhotoBtn}>
                  <TouchableWithoutFeedback
                  onBlur={onBlur}
                    ref={userPhotoUrlInputRef}
                    onPress={pickImage}
                  >
                    <Text style={{fontSize : 15 , color : "white"}}>Select from Iphone</Text>
                  </TouchableWithoutFeedback>
              </View>
                    }
            // render={({ onChange, onBlur, value }) =>
            //   <TextInput
            //     onBlur={onBlur}
            //     ref={userPhotoUrlInputRef}
            //     style={styles.userInfoInput}
            //     onChangeText={value =>
            //       onChange(value)
            //     }
            //      />}
          />
          <Text style={styles.categoryText}>Email</Text>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            onFocus={() => {
              emailInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={emailInputRef}
                style={styles.userInfoInput}
                onChangeText={email =>
                  setEmail(email)
                } />}
          />
          <Text style={styles.categoryText}>City</Text>
          <Controller
            name="city"
            defaultValue=""
            control={control}
            onFocus={() => {
              cityInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={cityInputRef}
                style={styles.userInfoInput}
                onChangeText={city =>
                  SetCity(city)
                }
              />}
          />
          <Text style={styles.categoryText}>Zipcode</Text>
          <Controller
            name="zipcode"
            defaultValue=""
            control={control}
            onFocus={() => {
              zipecodeInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={zipecodeInputRef}
                style={styles.userInfoInput}
                onChangeText={zipCode =>
                  setZipCode(zipCode)
                  // onChangeText={(value) => onChange(value)}5 
                } />}
          />
        </View>
        <View style={{marginTop : 20 , marginBottom : 30  ,backgroundColor: "rgb(232, 86, 86)" , width : "98%"  , height : 60 , borderRadius : 10 , marginLeft : 4 }} >
        <Text style={{ fontSize: 30 , color:"white" , textAlign : "center" , paddingTop : 10 }}>Pet Info</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.categoryText}>Pet Name</Text>
          <Controller
            name="petName"
            defaultValue=""
            control={control}
            onFocus={() => {
              petNameInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={petNameInputRef}
                style={styles.userInfoInput}
                onChangeText={petName =>
                  SetPetName(petName)
                }
              />}
          />
          <Text style={styles.categoryText}>Breed</Text>
          <Controller
            name="breed"
            defaultValue=""
            control={control}
            onFocus={() => {
              breedInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={breedInputRef}
                style={styles.userInfoInput}
                onChangeText={breed =>
                  SetBreed(breed)
                } />}
          />
          <Text style={styles.categoryText}>Pet age</Text>
          <Controller
            name="age"
            defaultValue=""
            control={control}
            onFocus={() => {
              ageInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={ageInputRef}
                style={styles.userInfoInput}
                onChangeText={value =>
                  onChange(value)
                } />}
          />
          <Text style={styles.categoryText}>Pet photo</Text>
          <Controller
            name="petPhotoUrl"
            defaultValue=""
            control={control}
            onFocus={() => {
              petPhotoUrlInputRef.current.focus()
            }}
            render={({onBlur, value}) => 
            <View style={styles.slctPhotoBtn}>
                  <TouchableWithoutFeedback
                  onBlur={onBlur}
                    ref={petPhotoUrlInputRef}
                    onPress={pickImageTwo}
                  >
                    <Text style={{fontSize : 15 , color : "white"}}>Select from Iphone</Text>
                  </TouchableWithoutFeedback>
              </View>
                    }
            // render={({ onChange, onBlur, value }) =>
            //   <TextInput
            //     onBlur={onBlur}
            //     ref={petPhotoUrlInputRef}
            //     style={styles.userInfoInput}
            //     onChangeText={value =>
            //       onChange(value)
            //     } 
            //     />}
          />
          <Text style={styles.categoryText}>Interests</Text>
          <View style={{flexDirection: "row" , flexWrap : "wrap" , justifyContent : "space-evenly" , marginTop : 20}}>
            <View style={{flexDirection : "column" , right : 31}}>
          <Text style={{fontWeight : "bold"}}>Frisbee :</Text>
          <CheckBox
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          name="frisbee"
          checked={checkFrisbee}
          onChange={(event) => setCheckFrisbee(event.target.checked)}
          />
          </View>
          <View style={{flexDirection : "column"}}>
          <Text style={{fontWeight : "bold"}}>Playing in the park :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            name="park"
            checked={checkPark}
            onChange={(event) => setCheckPark(event.target.checked)}
            
          />
          <View style={{flexDirection : "column" , right : 140}}>
          <Text style={{fontWeight : "bold"}} >Pup Cups :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            name="pupCup"
            checked={checkBall}
            onChange={(event) => setCheckPupCup(event.target.checked)}
          />
          </View>
          <View style={{flexDirection : "column" , bottom : 70}}>
          <Text style={{fontWeight : "bold"}} >Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            name="ball"
            checked={checkBall}
            onChange={(event) => setCheckBall(event.target.checked)}
          />
          </View>
          </View>
          {/* <View style={{flexDirection : "column"}}>
          <Text style={{fontWeight : "bold"}} >Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            name="ball"
            checked={checkBall}
            onChange={(event) => setCheckBall(event.target.checked)}
          />
          </View> */}
          </View>
          <Text style={styles.categoryTextTwo}>More info</Text>
          <Controller 
            name="info"
            defaultValue=""
            control={control}
            onFocus={() => {
              infoInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={infoInputRef}
                style={styles.userInfoInput}
                onChangeText={info =>
                  SetInfo(info)
                } />}
          />
        </View>
        <TouchableWithoutFeedback 
        style={styles.signUpBtn}
          // onPress={handleSubmit(handleFormSubmit)
          // onPress={handleSubmit(onsubmit)}
          onPress={handleOnSignup}
        >
          <Text style={styles.signUpBtnText}>Sign Up</Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  )
}
export default withFirebaseHOC(Signup)

const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  signupCont: {
    // backgroundColor: "rgb(232, 86, 86)",
    height: 1500
  },
  signUpHeader : {
    fontSize : 50, 
    alignSelf : "center",
    marginTop : 25,
    marginBottom : 35
  },
  headerCont: {
    flex: 1,
    height: "50%",
    width: "100%"
  },
  userInfo: {
    flex: 10,
    marginLeft: "15%",
    marginBottom : -200

  },
  slctPhotoBtn : {
    backgroundColor : "rgb(232, 86, 86)",
    height : 32,
    width : 145,
    // borderColor : "black",
    borderRadius : 8,
    // borderStyle : "solid",
    // borderWidth : 1,
    marginLeft : 60,
    padding : 5,
    marginTop : 8, 
    marginBottom : 15
   },
  categoryText : { 
    fontSize :16.5,
    marginBottom : 9,
    fontWeight : "bold"
  },
  categoryTextTwo : {
    fontSize :16.5,
    marginBottom : 9,
    fontWeight : "bold",
    marginTop : -50
  },
  userInfoInput: {
    // backgroundColor: "rgb(255, 250 , 250)",
    width: "75%",
    marginBottom: "5%",
    borderTopColor : "transparent",
    borderLeftColor : "transparent",
    borderRightColor : "transparent",
    borderBottomColor : "rgb( 0 , 0 , 0 )",
    borderBottomWidth : 2,
    fontSize : 20
  },
  petInfo: {
    flex: 10,
    marginLeft: "15%"
  },
  signUpBtn : {
    flexDirection: "row",
    backgroundColor : "rgb(232, 86, 86)",
    width : "80%",
    borderRadius : 35,
    height : 65,
    justifyContent : "center",
    marginBottom : 40,
    marginLeft : 42.5,
    paddingTop : 12.5
  },
  signUpBtnText : {
    fontSize : 30, 
    color: "rgb( 255 , 250 ,250)"
  }
})

// export default function Signup() { 

//   const { getData, getAllUsersNames } = useContext(UserContext)
//   const history = useHistory();
//   const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
//   ///////////////////+++++++++++++++++////////////////////
//   const [checkVaccinated, setCheckVaccinated] = useState(false) 
//   const [checkTrained, setCheckTrained] = useState(false)
//   const [checkPark, setCheckPark] = useState(false) 
//   const [checkBall, setCheckBall] = useState(false) 
//   const [checkFrisbee, setCheckFrisbee] = useState(false)

//   console.log("checkVaccinated", checkVaccinated);
//   console.log("checkTrained", checkTrained);
//   console.log("checkPark", checkPark);
//   console.log("checkBall", checkBall);
//   console.log("checkFrisbee", checkFrisbee);

//   ////////////// Code for Modal //////
//   const [isOpen, setIsOpen] = useState(false);
//   const [isErrorMessage, setIsErrorMessage] = useState();
//   const showModal = (errorMsg) => {
//     setIsOpen(true);
//     setIsErrorMessage(errorMsg);
//   };
//   const hideModal = () => {
//     setIsOpen(false);
//   };
//   ///////////////////////////////////

//   const [formObject, setFormObject] = useState({})
//   console.log("formObject", formObject);

//   async function getAllNames (sessionToken,arrYes) {
//     console.log("getAllNames")
//     await API.getAllUsers(sessionToken)
//     .then((res)=>{
//       //  arr1 of all users Names received in response get filtered to exclude Logged user from the array, result in arr2
//       const arr1 = res.data;
//       function checkUserName(name) {
//         if (name!==formObject.userName){
//           return name;
//         }
//       }
//       const arr2 = arr1.filter(checkUserName)

//       // arrYes conteined users name mutched by Loged user, all those name should be exlused from arr2, result in data
//       const filteredNames = function () {
//         const arr3 = arr2.filter(e=>arrYes.findIndex(i=>i === e) === -1);
//         return arr3;
//       };

//       const data = filteredNames();

//       getAllUsersNames(data)}
//     )
//   }
//   // Handles updating component state when the user types into the input field
//   function handleInputChange(event) {
//     event.preventDefault();
//     const { name, value } = event.target;
//     setFormObject({ ...formObject, [name]: value })
//   };
//   // Then alert the User if the User name had been taken otherwise update Context with new User data
//   function handleSignupResponse(res) {
//     console.log("res.data", res.data)
//     if (res.data === "User name already taken.") {
//       let errorMsg = res.data;
//       showModal(errorMsg);
//     } else {
//       console.log("res.data", res.data)
//       getData(res.data);
//       getAllNames(res.data.sessionToken,res.data.matchesYes);
//       history.push("/profile");
//     };
//   };
//   //--------------------------
//   function formFrontendValidations() { 
//     let validEmailFormat = validEmailRegex.test(formObject.email)
//     let userNameValid = 'userName' in formObject && (formObject.userName.length > 4 && formObject.userName.length < 21)
//     let passwordValid = 'password' in formObject && (formObject.password.length > 4 && formObject.password.length < 21)
//     let emailValid = 'email' in formObject && formObject.email.length > 0 && validEmailFormat
//     let petNameValid = 'petName' in formObject && formObject.petName.length > 0    
//     console.log("valids", userNameValid, passwordValid, emailValid, petNameValid) 
//     let fieldsValid = userNameValid && passwordValid && emailValid && petNameValid
//     if (!fieldsValid) {
//       let errorMsg = "Please fill ALL the required fields correctly i.e. Username (5-20 characters) , Password (5-20 Characters) , Email (in valid @format) and Petname (required)";
//       showModal(errorMsg);
//       return false
//     }
//     else {
//       return true
//     };
//   };
//   // -------------------------------------------------- 

//   // When the form is submitted, use the API.saveUser method to save the User data
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     let formValid = formFrontendValidations();
//     console.log("formValid", formValid)
//     if (formValid === true) {
//       API.saveUser({
//         password: formObject.password,
//         userData: {
//           userName: formObject.userName,
//           petName: formObject.petName,
//           zipCode: formObject.zipCode,
//           city: formObject.city,
//           breed: formObject.breed,
//           age: formObject.age,
//           park: checkPark,
//           ball: checkBall,
//           frisbee: checkFrisbee,
//           vaccinated: checkVaccinated,
//           trained: checkTrained,
//           email: formObject.email,
//           petPhotoUrl: formObject.petPhotoUrl,
//           userPhotoUrl: formObject.userPhotoUrl,          
//           info: formObject.info
//         }
//       })
//         .then(res => handleSignupResponse(res))
//         .catch(error => console.log(error.response));
//       };
//     };

//   return (
//     <View>
//       <NavbarSignUp />
//       <View style={{ backgroundColor:"rgb(232, 86, 86)", textAlign: "center" , width:"80%" ,  height:"110px" , paddingTop:"2%"  , borderRadius : "25px" , marginLeft:"9%" , marginBottom:"3%" , fontFamily: "Georgia, serif" , marginTop:"5%"}}>
//         <Text style={{ fontSize:"24px", color:"white" , fontSize:"45px"}}>Sign up</Text>
//         </View>
//       <Container fluid>
//         <View>
//           <View className="userDetails" style={{backgroundColor: "white"}}>
//             <View className="content">
//               <Row>
//               <Text style={{fontSize:"24px", marginLeft: "2%" , float:"left" }}>User Details</Text><Text style={{marginLeft: "85%", marginBottom:"2%"}}>* Required Fields</Text>
//                 <Col size="md-4">
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     minLength="5"
//                     maxLength="20"
//                     size="40"
//                     fontWeight="bolder"
//                     label="User Name &nbsp;&nbsp; * "
//                     name="userName"
//                     placeholder="5-20 characters required"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="email"
//                     size="40"
//                     label="Email &nbsp;&nbsp; * "
//                     name="email"
//                     placeholder="Email (Required and in email format)"
//                   />
//                     <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     size="40"
//                     label="City: "
//                     name="city"
//                     placeholder="City"
//                   />
//                 </Col>
//                 <Col size="md-4">
//                 <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     size="2000"
//                     label="URL to your Photograph: "
//                     name="userPhotoUrl"
//                     placeholder="URL to your Photograph"
//                   />
//                   <TextInput
//                     defaultValue=""
//                     onChange={handleInputChange}
//                     type="password"
//                     minLength="5"
//                     maxLength="20"
//                     size="40"
//                     label="Password &nbsp;&nbsp; * "
//                     name="password"
//                     placeholder="5-20 characters required"
//                   />
//                     <TextInput
//                     onChange={handleInputChange}
//                     type="number"
//                     size="10"
//                     label="Zipcode: "
//                     name="zipCode"
//                     placeholder="Zipcode"
//                   />
//                 </Col>
//               </Row>
//             </View>
//           </View>
//           <View className="petDetails" style={{backgroundColor: "white"}}>
//             <View className="content">
//               <Row>
//               <Text style={{fontSize:"24px", marginLeft: "2%" ,  float: "left"}}>Pet's Details</Text><Text style={{marginLeft: "85%", marginBottom:"2%"}}>* Required Fields</Text>
//                 <Col size="md-4">
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     size="40"
//                     label="Your Pet's Name &nbsp;&nbsp; * "
//                     name="petName"
//                     placeholder="Your Pet's Name (Required)"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     maxLength="50"
//                     size="40"
//                     label="Your Pet's Breed: "
//                     name="breed"
//                     placeholder="Your Pet's Breed"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="number"
//                     maxLength="3"
//                     size="40"
//                     label="Your Pet's Age in years: "
//                     name="age"
//                     placeholder="Your Pet's Age"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     type="text"
//                     size="2000"
//                     label="URL to your Pet's Photograph: "
//                     name="petPhotoUrl"
//                     placeholder="URL to your Pet's Photograph"
//                   />
//                   <RadioButton
//                     radioLabel = "Vaccinated:"
//                     radioName = "vaccinated"
//                     onChange={(event)=>setCheckVaccinated(event.target.value)}
//                   />
//                   <RadioButton
//                     radioLabel = "Trained:"
//                     radioName = "trained"
//                     onChange={(event)=>setCheckTrained(event.target.value)}
//                   />
//                 </Col>
//                 <Col size="md-4">               
//                   <Text>Your Pet's Interests:</Text>
//                   <View>
//                     <Text>Playing in the park :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
//                     <Input
//                       type="checkbox"
//                       name="park"                      
//                       checked={checkPark}
//                       onChange={(event)=>setCheckPark(event.target.checked)}      
//                     />
//                   </View>
//                   <View>
//                     <Text>Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
//                     <Input
//                       type="checkbox"
//                       name="ball"                      
//                       checked={checkBall}
//                       onChange={(event)=>setCheckBall(event.target.checked)} 
//                     />
//                   </View>
//                   <View>
//                     <Text>Playing with a frisbee :&nbsp;</Text>
//                     <Input
//                       type="checkbox"
//                       name="frisbee"                      
//                       checked={checkFrisbee}
//                       onChange={(event)=>setCheckFrisbee(event.target.checked)} 
//                     />
//                   </View>
//                   <TextArea
//                     onChange={handleInputChange}
//                     label="Additional Information about your Pet: "
//                     name="info"
//                     rows="8"
//                     placeholder="Additional Information about your Pet"
//                   />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col size="md-4">
//                   <FormBtn
//                     disabled={!(formObject.userName && formObject.password && formObject.petName && formObject.email)}
//                     onClick={handleFormSubmit}
//                   >
//                     <Text>Save Profile</Text>
//                     </FormBtn>
//                   {/* ----------------------Rendering Modal */}
//                   <Modal style={styles.myModal} show={isOpen} onHide={hideModal}>
//                     <Modal.Header>
//                       <Modal.Title><Text>Sorry!</Text></Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body><Text>{isErrorMessage}</Text></Modal.Body>
//                     <Modal.Footer>
//                       <ModalButton onClick={hideModal}><Text>Ok</Text></ModalButton>
//                     </Modal.Footer>
//                   </Modal>
//                   {/* ------------------------------------ */}
//                 </Col>
//               </Row>
//             </View>
//           </View>
//         </View>
//       </Container>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   myModal: {
//     // backgroundImage: url("./images/dog-world-2.png"),
//     backgroundColor:"rgb(232, 86, 86)",
//     // background-blend-mode: hard-light,
//     height: "378px"
//   }
// });