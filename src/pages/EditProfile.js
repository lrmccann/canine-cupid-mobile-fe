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
import { Text, TextInput, View, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements'


export default function EditProfile() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { getData, getAllUsersNames , user } = useContext(UserContext)
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const { control, handleSubmit, getValues, setValue, register } = useForm();
  // const { control, handleSubmit, getValues, setValue, register } = useForm(user);
  const history = useHistory();
  const navigation = useNavigation()

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
  // checkbox consts

  const [checkVaccinated, setCheckVaccinated] = useState(user.vaccinated)
  const [checkTrained, setCheckTrained] = useState(user.trained)
  const [checkPark, setCheckPark] = useState(user.park)
  const [checkBall, setCheckBall] = useState(user.ball)
  const [checkFrisbee, setCheckFrisbee] = useState(user.frisbee)

    const handleFormSubmit = data => {  
    // event.preventDefault();
    let formValid = formFrontendValidations();
    // console.log("formValid", formValid)
    // console.log("user.userName", user.userName)
    if (formValid === true) {
      // formObject.vaccinated = checkVaccinated
      // formObject.trained = checkTrained
      // formObject.park = checkPark
      // formObject.ball = checkBall
      // formObject.frisbee = checkFrisbee

      API.updateUser({
        userData: data
      }, user.userName)
        .then(res => handleEditProfileResponse(res))
        .catch(error => console.log(error.response));
        navigation.navigate('profile')
    }
    };

       function formFrontendValidations() { 
         let newVal = getValues()
         console.log(newVal)
    let validEmailFormat = validEmailRegex.test(newVal.email)  
    let emailValid = newVal.email.length > 0 && validEmailFormat
    let petNameValid = newVal.petName.length > 0    
    console.log("valids", emailValid, petNameValid) 
    let fieldsValid = emailValid && petNameValid
    if (!fieldsValid) {
      let errorMsg = "Please fill ALL the required fields correctly i.e. Email (in valid @format) and Petname (required)";
      // showModal(errorMsg);
      return false
    }
    else {
      return true
    }
  }

    function handleEditProfileResponse(res) {
      // const navigation = useNavigation()
    console.log("res.data1", res.data)
      getData(res.data)
      // navigation.navigate('profile')
  };

  return (
    <ScrollView >
      <View style={styles.signupCont}>
        {/* <View style={styles.header}> */}
        <Text style={{fontSize : 65}}>EditProfile</Text>
        <Header />
        <Text style={{ fontSize: 30 }}>User Info</Text>
        <View style={styles.userInfo}>
          <Text>Username</Text>
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
          <Text>Password</Text>
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
          <Text>User photo url</Text>
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
          <Text>Email</Text>
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
          <Text>City</Text>
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
          <Text>Zipcode</Text>
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
        <Text style={{ fontSize: 30, marginTop: "15%" }}>Pet Info</Text>
        <View style={styles.petInfo}>
          <Text>Pet Name</Text>
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
          <Text>Breed</Text>
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
          <Text>Pet age</Text>
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
          <Text>Pet photo url</Text>
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
          <View style={{flexDirection: "row"}}>
          <Text>Playing with a frisbee :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          name="frisbee"
          checked={checkFrisbee}
          onChange={(event) => setCheckFrisbee(event.target.checked)}
          />
          <Text> Playing in the park :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Text>
          <CheckBox
            name="park"
            defaultValue={user.park}       
            defaultChecked={user.park}
            defaultChecked={checkPark}       
            checked={checkPark}
            onChange={(event) => setCheckPark(event.target.checked)}     
          />
            <Text> Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Text>
            <CheckBox
              name="ball"
              defaultValue={user.ball}  
              defaultChecked={user.ball}          
              defaultChecked={checkBall}            
              checked={checkBall}
              onChange={(event) => setCheckBall(event.target.checked)}
            />
            </View>
          <Text>More info</Text>
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
        <Button title="Save Changes"
          onPress={handleSubmit(handleFormSubmit)
          }
        ></Button>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  header: {
    flex: 1
  },
  signupCont: {
    backgroundColor: "rgb(232, 86, 86)",
    height: 1300
  },
  headerCont: {
    flex: 1,
    height: "50%",
    width: "100%"
  },
  userInfo: {
    flex: 10,
    marginLeft: "15%"

  },
  userInfoInput: {
    backgroundColor: "rgb(255, 250 , 250)",
    width: "75%",
    marginBottom: "5%",
  },
  petInfo: {
    flex: 10,
    marginLeft: "15%"
  }
})


































// import React, { useState, useContext, useEffect } from "react";
// import { Button } from "react-bootstrap";
// import { Col, Row, Container } from "../components/Grid";
// import { Input , TextArea, FormBtn } from "../components/Form";
// import Navbar from "../components/Navbar";
// import Modal from 'react-bootstrap/Modal';
// import { ModalButton } from "../components/Button";
// import RadioButton from "../components/RadioButton"




//   // Handles updating component state when the user types into the input field
//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     setFormObject({ ...formObject, [name]: value })
//   };
//   // When the form is submitted, use the API.updateUser method to save the User data
//   // Then reload User from the database




//    //--------------------------
//    function formFrontendValidations() { 
//     let validEmailFormat = validEmailRegex.test(formObject.email)  
//     let emailValid = 'email' in formObject && formObject.email.length > 0 && validEmailFormat
//     let petNameValid = 'petName' in formObject && formObject.petName.length > 0    
//     console.log("valids", emailValid, petNameValid) 
//     let fieldsValid = emailValid && petNameValid
//     if (!fieldsValid) {
//       let errorMsg = "Please fill ALL the required fields correctly i.e. Email (in valid @format) and Petname (required)";
//       showModal(errorMsg);
//       return false
//     }
//     else {
//       return true
//     }
//   }
//   //-------------------------- 
//   function handleEditProfileResponse(res) {
//     console.log("res.data1", res.data)
//       getData(res.data)
//       history.push("/profile");
//   };
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
//   // ------------------  
//   return (
//     <View>
//       <Navbar />
//       <Text style={styles.editProfileTitle} >Edit  Profile</Text>
//       <View style={styles.line}></View>
//       <Container fluid>
//         <View>
//           <View style={styles.userDetails}>
//             <View style={styles.editProfileContentUser}>
//               <Row>
//               <Text style={styles.userDetailsTitle} >User Details</Text><Text style={styles.reqFieldsText}>* Required Fields</Text>
//                 <Col size="md-4">
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.userName}
//                     type="text"
//                     minLength="5"
//                     maxLength="20"
//                     size="40"
//                     fontWeight="bolder"
//                     label="User Name (Can not change this): "
//                     name="userName"
//                     placeholder="User Name (5-20 characters required)"
//                     disabled
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.email}
//                     type="email"
//                     size="40"
//                     label="Email &nbsp;&nbsp; * "
//                     name="email"
//                     placeholder="Email (Required and in email format)"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.city}
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
//                     defaultValue={user.userPhotoUrl}
//                     type="text"
//                     size="2000"
//                     label="URL to your Photograph: "
//                     name="userPhotoUrl"
//                     placeholder="URL to your Photograph"
//                   />
//                     {/* <Input
//                     defaultValue=""
//                     onChange={handleInputChange}
//                     type="password"
//                     minLength="5"
//                     maxLength="20"
//                     size="40"
//                     label="Password &nbsp;&nbsp; * "
//                     name="password"
//                     placeholder="5-20 characters required"
//                   /> */}
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.zipCode}
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
//           <View style={styles.petDetails}>
//             <View style={styles.petDetailsContainer}>
//               <Row>
//               <Text style={styles.petTitle} >Pet's Details</Text><Text style={styles.reqFieldsTextTwo}>* Required Fields</Text>
//                 <Col size="md-4">
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.petName}
//                     type="text"
//                     size="40"
//                     label="Your Pet's Name &nbsp;&nbsp; * "
//                     name="petName"
//                     placeholder="Your Pet's Name (Required)"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.breed}
//                     type="text"
//                     maxLength="50"
//                     size="40"
//                     label="Your Pet's Breed: "
//                     name="breed"
//                     placeholder="Your Pet's Breed"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.age}
//                     type="number"
//                     maxLength="3"
//                     size="40"
//                     label="Your Pet's Age in years: "
//                     name="age"
//                     placeholder="Your Pet's Age"
//                   />
//                   <TextInput
//                     onChange={handleInputChange}
//                     defaultValue={user.petPhotoUrl}
//                     type="text"
//                     size="2000"
//                     label="URL to your Pet's Photograph: "
//                     name="petPhotoUrl"
//                     placeholder="URL to your Pet's Photograph"
//                   />
//                   <RadioButton
//                     radioLabel = "Vaccinated:"
//                     radioName = "vaccinated"
//                     // defaultChecked={checkVaccinated}
//                     // checked={checkVaccinated}
//                     // {this.props.editable ? editable={this.props.editableOpts} : null}
//                     // {{checkVaccinated} ? defaultChecked : null}
//                     onChange={(event)=>setCheckVaccinated(event.target.value)}
//                   />
//                   <RadioButton
//                     radioLabel = "Trained:"
//                     radioName = "trained"
//                     // defaultChecked={checkTrained}
//                     // checked={checkTrained}
//                     onChange={(event)=>setCheckTrained(event.target.value)}
//                   />
//                 </Col>
//                 <Col size="md-4">
//                   <Text>Your Pet's Interests:</Text>
//                   <TextInput>
//                     <Text> Playing in the park :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Text>
//                     <TextInput
//                       type="checkbox"
//                       name="park"               
//                       // defaultValue={user.park}       
//                       // defaultChecked={user.park}
//                       // defaultChecked={checkPark}       
//                       checked={checkPark}
//                       onChange={(event)=>setCheckPark(event.target.checked)}      
//                       // checked={state.park}                
//                       // onChange={handleChange}
//                       // onChange={(event)=>setCheckPark(event.target.value)}
//                     />
//                   </TextInput>
//                   <TextInput>
//                     <Text> Playing with a ball :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Text>
//                     <TextInput
//                       type="checkbox"
//                       name="ball"     
//                       // defaultValue={user.ball}  
//                       // defaultChecked={user.ball}          
//                       // defaultChecked={checkBall}            
//                       checked={checkBall}
//                       onChange={(event)=>setCheckBall(event.target.checked)} 
//                     />
//                   </TextInput>
//                   <TextInput>
//                     <Text> Playing with a frisbee :&nbsp; </Text>
//                     <TextInput
//                       type="checkbox"
//                       name="frisbee"
//                       // defaultValue={user.frisbee}    
//                       // defaultChecked={user.frisbee}   
//                       // defaultChecked={checkFrisbee}                      
//                       checked={checkFrisbee}
//                       onChange={(event)=>setCheckFrisbee(event.target.checked)} 
//                     />
//                   </TextInput>
//                   <TextArea
//                     onChange={handleInputChange}
//                     defaultValue={user.info}
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
//                    disabled={!(formObject.petName && formObject.email)}
//                     onClick={handleFormSubmit}
//                   >
//                     <Text> Save Changes </Text>          
//                   </FormBtn>
// {/* ----------------------Rendering Modal */}
//                     <Modal style={styles.myModal} show={isOpen} onHide={hideModal}>
//                     <Modal.Header>
//                       <Modal.Title> <Text>Sorry! </Text></Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body> <Text> {isErrorMessage} </Text></Modal.Body>
//                     <Modal.Footer>
//                       <ModalButton onClick={hideModal}> <Text> Ok </Text></ModalButton>
//                     </Modal.Footer>
//                   </Modal>
// {/* ------------------------------------ */}
//                 </Col>
//               </Row>
//             </View>
//           </View>
//         </View>
//       </Container>
//     </View>
//   );
// }

