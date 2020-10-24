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
import { Text, TextInput, View, StyleSheet, ScrollView, Button, Alert  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'
import { TouchableHighlight } from "react-native-gesture-handler";


export default function Signup() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { getData, getAllUsersNames } = useContext(UserContext)
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


  const onsubmit = async data => {
         navigation.navigate('profile')
    let formValid = formFrontendValidations();
    if (formValid === true) {
    await API.saveUser({
      password: data.password,
      userData: {
        userName: data.userName,
        petName: data.petName,
        zipCode: data.zipcode,
        city: data.city,
        breed: data.breed,
        age: data.age,
        // park: checkPark,
        // ball: checkBall,
        // frisbee: checkFrisbee,
        // vaccinated: checkVaccinated,
        // trained: checkTrained,
        email: data.email,
        petPhotoUrl: data.petPhotoUrl,
        userPhotoUrl: data.userPhotoUrl,
        info: data.info
      }
    })
      .then(res => handleSignupResponse(res))
      .catch(error => console.log(error.response))

    // console.log('Form Data' , data );
  }
}

  const getAllNames = async  (sessionToken, arrYes ) => {
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
  //   // Handles updating component state when the user types into the input field

  // function handleInputChange(event) {
  //   event.preventDefault();
  //   const { name, value } = event.target;
  //    setFormObject({ ...formObject, [name]: value })
  // };

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
  const formFrontendValidations  = async => { 
    let newVal = getValues();
    console.log(newVal , "loooook at meeee")
    // console.log(control , " i be the control thang")
    let validEmailFormat = validEmailRegex.test(newVal.email)
    let userNameValid =(newVal.userName.length > 4 && newVal.userName.length < 21)
    let passwordValid = (newVal.password.length > 4 && newVal.password.length < 21)
    let emailValid = (newVal.email.length > 0 && validEmailFormat)
    let petNameValid =  newVal.petName.length > 0    
    console.log("valids", userNameValid, passwordValid, emailValid, petNameValid) 
    let fieldsValid = userNameValid && passwordValid && emailValid && petNameValid
    if (!fieldsValid) {
      let errorMsg = "Please fill ALL the required fields correctly i.e. Username (5-20 characters) , Password (5-20 Characters) , Email (in valid @format) and Petname (required)";
      // showModal(errorMsg);
      return false
    }
    else {
      return true
    };
  };
  return (
    <ScrollView
    showsVerticalScrollIndicator ={false}
    showsHorizontalScrollIndicator={false}
    >
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
                onChangeText={value =>
                  onChange(value)
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
                onChangeText={value =>
                  onChange(value)
                } />}
          />
          <Text style={styles.categoryText}>User photo url</Text>
          <Controller
            name="userPhotoUrl"
            defaultValue=""
            control={control}
            onFocus={() => {
              userPhotoUrlInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={userPhotoUrlInputRef}
                style={styles.userInfoInput}
                onChangeText={value =>
                  onChange(value)
                } />}
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
                onChangeText={value =>
                  onChange(value)
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
                onChangeText={value =>
                  onChange(value)
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
                onChangeText={value =>
                  onChange(value)
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
                onChangeText={value =>
                  onChange(value)
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
                onChangeText={value =>
                  onChange(value)
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
          <Text style={styles.categoryText}>Pet photo url</Text>
          <Controller
            name="petPhotoUrl"
            defaultValue=""
            control={control}
            onFocus={() => {
              petPhotoUrlInputRef.current.focus()
            }}
            render={({ onChange, onBlur, value }) =>
              <TextInput
                onBlur={onBlur}
                ref={petPhotoUrlInputRef}
                style={styles.userInfoInput}
                onChangeText={value =>
                  onChange(value)
                } />}
          />
          <View style={{flexDirection: "row" , flexWrap : "wrap" , justifyContent : "space-around"}}>
            <View style={{flexDirection : "column"}}>
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
          </View>
          <View style={{flexDirection : "column"}}>
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
          <Text style={styles.categoryText}>More info</Text>
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
                onChangeText={value =>
                  onChange(value)
                } />}
          />
        </View>
        <TouchableHighlight style={styles.signUpBtn}
          // onPress={handleSubmit(handleFormSubmit)
          onPress={handleSubmit(onsubmit)
          }
        >
          <Text style={styles.signUpBtnText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
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
  categoryText : { 
    fontSize :16.5,
    marginBottom : 9,
    fontWeight : "bold"
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