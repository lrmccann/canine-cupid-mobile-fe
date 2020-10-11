import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';
// import API from "../utils/API";
// import UserContext from "../utils/UserContext";
// import { Col, Row, Container } from "../components/Grid";
// import { Input } from "../components/Form";
import { LoginButton, SignupButton } from "../components/Button";
// import { ModalButton} from "../components/Button";
// import {NavbarNolinks} from '../components/Navbar';
import Header from "../components/Header";
// import DogLogin from "./images/dog-for-login.png";
// import LoginText from "./images/login-text.png";
import { Button, Text, TextInput, View, ViewComponent , StyleSheet , TouchableHighlight , Image} from "react-native";
import Profile from "./Profile";


export default function Login (props) {
  const [pageOne , setPageOne] = useState(true)
  let onpress = () => {
    setPageOne(false)
  }
  let onpressTwo = () => {
    setPageOne(true)
  }
  if(pageOne === true){
  return( <View style={styles.mainCont}>
<View style={styles.headerCont}>
    <Header />
    </View>
    <View style={styles.userNameCont} >
      <Text style={styles.loginText}>Username</Text>
      <TextInput style={styles.TextInputStuff}  {...props} editable/>
  {/* <Text>Hello</Text> */}
  {/* </View> */}
  {/* <View style={styles.passwordCont} > */}
    <Text style={styles.loginText}>Password</Text>
      <TextInput style={styles.TextInputStuffTwo}  {...props} editable/>
  {/* <Text>Hello</Text> */}
  </View>
  <View style={styles.loginBtn}>
    <LoginButton  />
    <SignupButton />
    {/* <Button style={styles.loginBtn} onPress={onpress} title="Log In"></Button> */}
  </View>
  {/* <Button title="i button" onPress={onpress}></Button> */}
  {/* <TouchableHighlight onPress={onpress} >
  <View style={styles.touchView}>
    <View style={styles.button}>
      <Text>I am button</Text>
    </View>
    </View>
  </TouchableHighlight> */}
  </View>
  )
  }
  if(pageOne === false){
    return( <View style={styles.mainCont}>
      <View>
      <Header />
      </View>
      <View>
    <Text>Hello</Text>
    </View>
    <Button title = "i button as well" onPress={onpressTwo} prof={Profile} ></Button>
    <TouchableHighlight onClick={onpressTwo} >
      <View style={styles.button}>
        <Text>I was pressed now I false</Text>
      </View>
    </TouchableHighlight>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  mainCont: {
    backgroundColor : "rgb(232, 86, 86)",
    height: "100%"
  },
  headerCont: {
    flex : 2,
    height : "50%",
    width: "100%"
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
    backgroundColor: "rgb(255 , 250, 250)",
    width: "70%",
    height: "8%",
    borderRadius: 3,
    marginLeft: 50,
    // marginTop: -80
  },
  TextInputStuffTwo: {
    backgroundColor: "rgb(255 , 250, 250)",
    width: "70%",
    height: "8%",
    borderRadius: 3,
    marginLeft: 50,
    // marginTop: -80
  }, 
  loginBtn : {
    color: "rgb( 0 , 0 ,0)",
    height: "20%",
  },
  loginText : {
    fontSize : 18,
    marginBottom : 10,
    marginLeft : 50, 
    marginTop : 20
  }
  })

// export default function Login() {

//   const { getData, getAllUsersNames } = useContext(UserContext)

//   const history = useHistory();

//   const [loginObject, setLoginObject] = useState({})
//   console.log("stateLogin", loginObject);

//   ////////////// Code for Modal //////
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isErrorMessage, setIsErrorMessage] = React.useState();
//   const [loginIsOpen, setLoginIsOpen] = React.useState();

//   const showModal = (errorMsg) => {
//     setIsOpen(true);
//     setIsErrorMessage(errorMsg);
//   };

//   const hideModal = () => {
//     setIsOpen(false);
//   };

//   const showLoginModal = () => {
//     setLoginIsOpen(true);
//   }
//   const hideLoginModal = () => {
//     setLoginIsOpen(false)
//   }
//   ///////////////////////////////////

//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     setLoginObject({ ...loginObject, [name]: value })
//   };

//   async function handleLoginSubmit(event) {
//     event.preventDefault();
//     if (loginObject.userName && loginObject.password) {
//       await API.checkUser({
//         userName: loginObject.userName,
//         password: loginObject.password
//       })
//         .then(res => handleAuthenticatedResponse(res))
//         .catch(error => console.log(error.response));
//     }
//   };

//   async function getAllNames(sessionToken, arrYes, arrNo) {
//     console.log("getAllNames")
//     await API.getAllUsers(sessionToken)
//       .then((res) => {
//         //  arr1 of all users Names received in response get filtered to exclude Logged user from the array, result in arr2
//         const arr1 = res.data;
//         function checkUserName(name) {
//           if (name !== loginObject.userName) {
//             return name;
//           }
//         }
//         const arr2 = arr1.filter(checkUserName)

//         // arrYes conteined names of the users matched by Loged user, all those names should be exlused from arr2, result in data
//         const filteredNamesYes = function () {
//           const data = arr2.filter(e => arrYes.findIndex(i => i === e) === -1);
//           return data;
//         };
//         const arr3 = filteredNamesYes();

//         // arrNo conteined names of the users matched by Loged user, all those names should be exlused from arr3, result in data
//         const filteredNamesNo = function () {
//           const data = arr3.filter(e => arrNo.findIndex(i => i === e) === -1);
//           return data;
//         };
//         const arr4 = filteredNamesNo();

//         getAllUsersNames(arr4)
//       })
//   }

//   function handleAuthenticatedResponse(res) {
//     if (res.data === "User not found.") {
//       let errorMsg = "User Not Found!";
//       showModal(errorMsg);
//     } else if (res.data === "Wrong password.") {
//       let errorMsg = "Password is Wrong!";
//       showModal(errorMsg);
//     } else {
//       console.log("res.data", res.data);
//       getData(res.data);
//       getAllNames(res.data.sessionToken, res.data.matchesYes, res.data.matchesNo);
//       // getAllUsersID(allID);
//       // console.log("allID",allID);
//       history.push("/profile");
//     };
//   };

//   function handleSignupSubmit(event) {
//     event.preventDefault();
//     history.push("/signup");
//   };
//   return (
//     <Container fixed>
//     <View style={styles.loginContainer}>
//           <Header />
//       <NavbarNolinks>
//       <LoginButton
//         onClick={showLoginModal} />
//       </NavbarNolinks>
//       <View style={styles.loginBodyContent}>
//         <Container fluid>
//           <Row>
//           <View className="col-md-5" style={{marginTop:"17%", marginLeft:"4%" , float:"left", opacity: "100%"}}>
//                 <Image style={{height:"60%" , width:"100%" , marginLeft : "4%"}} alt={"Canine Cupid Login Header"} src={LoginText}/>
//             </View>
//             <View className="col-md-6" style={{float:"left", marginTop:"2%" , marginLeft: "3.5%" }}>
//             <Col size="md-6">
//               <Image style={styles.loginImage} alt={"Golden Retriever Dog"} src={DogLogin}/>
//               </Col>
//               </View>
//           </Row>
//         </Container>
//         <Modal style={{backgroundImage: url("./images/dog-world-2.png") , backgroundColor:"rgb(232, 86, 86)" }} show={loginIsOpen} onHide={hideLoginModal}>
//           <Modal.Header>
//             <Modal.Title > <Text style={{ textAlign: "center" , fontSize:"16px" }}>Enter your pup's credentials</Text></Modal.Title>
//             <Button onClick={hideLoginModal} style={{ backgroundColor: "inherit" , textAlign: "center" , cursor: "pointer"  , whiteSpace: "nowrap" , border: "none", display: "inline-block", padding: "8px 16px", verticalAlign: "middle", overflow: "hidden", textDecoration: "none", color: "inherit"  }}>X</Button>
//           </Modal.Header>
//           <Modal.Body>
//             <TextInput>
//               <View style={styles.loginPageContent}>
//                 <Row>
//                   <Col size="md-6">
//                     <TextInput
//                       onChange={handleInputChange}
//                       type="text"
//                       size="36"
//                       label="User Name: "
//                       name="userName"
//                       placeholder="User Name (required)"
//                     />
//                     <TextInput
//                       onChange={handleInputChange}
//                       type="password"
//                       size="36"
//                       label="Password: "
//                       name="password"
//                       placeholder="Password (required)"
//                     />
//                     <LoginButton
//                       disabled={!(loginObject.userName && loginObject.password)}
//                       onClick={handleLoginSubmit}
//                       height="40px"
//                       width="130px"
//                       border="1px solid black"
//                       float="right"
//                       fontSize="20px"
//                       marginRight=".2%"
//                       marginTop=".2%"
//                       fontWeight="bold"
//                       backgroundColor="white"
//                     />
//                   </Col>
//                 </Row>
//               </View>
//             </TextInput>
//           </Modal.Body>
//           <Modal.Footer>
//             {/* <a href="/Signup" {...handleSignupSubmit}><Text style={{fontSize:"10.72px"}}>Don't have an account?</Text></a> */}
//             </Modal.Footer>
//         </Modal>
//         {/* ----------------------Rendering Modal */}
//         <Modal style={styles.myModal} show={isOpen} onHide={hideModal}>
//           <Modal.Header>
//             <Modal.Title> <Text> Sorry! </Text></Modal.Title>
//           </Modal.Header>
//           <Modal.Body><View style={{alignContent: "center"}}><Text style={{fontSize : "18.72px"}}>{isErrorMessage}</Text></View></Modal.Body>
//           <Modal.Footer>
//             <ModalButton
//               height="40px"
//               width="130px"
//               border="1px solid black"
//               float="right"
//               fontSize="20px"
//               marginRight=".2%"
//               marginBottom=".3%"
//               fontWeight="bold"
//               backgroundColor="white"
//               onClick={hideModal}> <Text> Okay </Text></ModalButton>
//           </Modal.Footer>
//         </Modal>
//         {/* ------------------------------------ */}
//       </View>
//     </View>
//     </Container>
//   );
// }

// const styles = StyleSheet.create({
//   loginContainer: {
//     height: "1000px",
//     width:"100%",
//     backgroundColor:"rgb(232, 86, 86)" ,
//     overflow: "hidden"
//   },
//   loginBodyContent : {
//     height: "100%",
//     width: "100%"
//   },
//   loginImage : {
//     height: "650px"
//   },
//   loginPageContent : {
//     height: "1000px",
//     width:"100%",
//     backgroundColor:"rgb(232, 86, 86)",
//     overflow: "hidden"
//   }, 
//   myModal : {
//     // background-image: url("./images/dog-world-2.png");
//     backgroundColor:"rgb(232, 86, 86)",
//     // background-blend-mode: hard-light;
//     height: "378px"
//   }
// })