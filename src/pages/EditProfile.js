import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import API from "../utils/API";
// import { Col, Row, Container } from "../components/Grid";
// import { Input , TextArea, FormBtn } from "../components/Form";
// import Navbar from "../components/Navbar";
// import UserContext from "../utils/UserContext";
// import Modal from 'react-bootstrap/Modal';
// import { ModalButton } from "../components/Button";
// import RadioButton from "../components/RadioButton"
import { Text, TextInput, View , StyleSheet } from "react-native";
export default function EditProfile () {
  useEffect(()=>{
    return(
      <View>
    <Text>Hello</Text>
    </View>
    )
  }),[]

}
// export default function EditProfile() {
//   const { getData } = useContext(UserContext)
//   const history = useHistory();
//   const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
//   const { user } = useContext(UserContext)
//   console.log("user", user)

//   // Setting our component's initial state
//   const [formObject, setFormObject] = useState(user)
//   console.log("state", formObject);

//    ///////////////////+++++++++++++++++////////////////////
//    const [checkVaccinated, setCheckVaccinated] = useState(user.vaccinated) 
//    const [checkTrained, setCheckTrained] = useState(user.trained)
//    const [checkPark, setCheckPark] = useState(user.park) 
//    const [checkBall, setCheckBall] = useState(user.ball) 
//    const [checkFrisbee, setCheckFrisbee] = useState(user.frisbee)
 
//    console.log("checkVaccinated", checkVaccinated);
//    console.log("checkTrained", checkTrained);
//    console.log("checkPark", checkPark);
//    console.log("checkBall", checkBall);
//    console.log("checkFrisbee", checkFrisbee);
//    /////////////////////////++++++++++++++++/////////////////

//   // Handles updating component state when the user types into the input field
//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     setFormObject({ ...formObject, [name]: value })
//   };
//   // When the form is submitted, use the API.updateUser method to save the User data
//   // Then reload User from the database
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     let formValid = formFrontendValidations();
//     console.log("formValid", formValid)
//     console.log("user.userName", user.userName)
//     if (formValid === true) {
//       formObject.vaccinated = checkVaccinated
//       formObject.trained = checkTrained
//       formObject.park = checkPark
//       formObject.ball = checkBall
//       formObject.frisbee = checkFrisbee

//       API.updateUser({
//         userData: formObject
//       }, user.userName)
//         .then(res => handleEditProfileResponse(res))
//         .catch(error => console.log(error.response));
//     }
//   };
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

// const styles = StyleSheet.create({
//   editProfileTitle: {
//     // fontSize: 24 , 
//     fontFamily: "Georgia, serif" , 
//     margin: "2.5% 0 0 44%" ,
//     fontSize:50
//   },
//   userDetailsTitle : {
//     marginLeft: "2%" ,
//     //  float:"left",
//      fontSize : 24
//   },
//   reqFieldsText : {
//     marginLeft: "85%", 
//     marginBottom:"2%"
//   },
//   line : {
//     // border: "solid black 1px", 
//     margin: "4% 10% 5% 10%"
//   },
//   userDetails : {
//     backgroundColor : "white",
//     // border: "solid 1px black",
//     padding: "5px",
//     marginTop: "2%"
//   },
//   editProfileContentUser : {
//     padding: "15px",
//     color:"black",
//     paddingTop: "15px"
//   }, 
//   petDetails : {
//     backgroundColor: "white",
//     marginBottom: "5%"
//   },
//   petDetailsContainer : {
//     marginLeft: "2%" ,
//       // float: "left",
//       padding: "15px",
//       color:"black",
//       paddingTop: "15px"
//   },
//   petTitle : {
//     marginLeft: "2%" ,
//       // float: "left"
//   },
//   reqFieldsTextTwo : {
//     marginLeft: "85%", 
//     marginBottom:"2%"
//   },
//   myModal : {
//     // backgroundImage: url("./images/dog-world-2.png"),
//     backgroundColor:"rgb(232, 86, 86)",
//     // background-blend-mode: hard-light;
//     height: "378px"
//   }
// });


