import React, { useContext, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Row, Container } from "../components/Grid";
import CardTwo from "../components/CardTwo";
import SwipeBtn from "../components/SwipeBtn";
import ProfDetails from "../components/ProfDetails";
import Col from "../components/Col";
import Navbar from "../components/Navbar";
import API from "../utils/API";
import UserContext from "../utils/UserContext"
// import Moment from 'react-moment';
import FlashMessage from "react-flash-message";
import { StyleSheet, Text, View , Image } from 'react-native';

export default function Matchnow () {
    
    const { user, allUsersNames, newUserData } = useContext(UserContext)
    console.log("newUserData", newUserData);

     ////////////// Code for Modal //////
    const [isOpen, setIsOpen] = React.useState(false);
    const [isErrorMessage, setIsErrorMessage] = React.useState();
    const showModal = (errorMsg) => {
        setIsOpen(true);
        setIsErrorMessage(errorMsg);
    };
    const hideModal = () => {
        setIsOpen(false);
    };
     ///////////////////////////////////

    const [matchedYesNames, setMatchedYesName] = useState(user.matchesYes)
    console.log("matchedYesName",matchedYesNames);

    const [matchedNoNames, setMatchedNoName] = useState(user.matchesNo)
    console.log("matchedNoName",matchedNoNames);

    const [nextUserData, setNextUserData] = useState (newUserData);

    const [allNames, setAllNames] = useState (allUsersNames);

    const [status, setStatus] = useState(false);

    const [status2, setStatus2] = useState(false);

    // let readableDate = <Moment format="YYYY/MM/DD">{nextUserData.date}</Moment>;
    
    let vaccinated = "";
    let trained = "";

    // if ('park' in user && user.park === "on")
    if (nextUserData.vaccinated === true) {
        vaccinated = "Yes"
    } else if (nextUserData.vaccinated === false) {
        vaccinated = "No"
    }

    if (nextUserData.trained === true) {
        trained = "Yes"
    } else if (nextUserData.trained === false) {
        trained = "No"
    }



    //picker of random item from an array
    // const rand = function (items) {
    //     return items[~~(items.length * Math.random())];
    // };
    //exluder of matched Yes names from allUsersNames array 
    const filteredNamesYes = function () {
        const arr = allUsersNames.filter(e=>matchedYesNames.findIndex(i=>i === e) === -1);
        return arr;
    };   
    //filtered array
    const cuttedArray1 = filteredNamesYes();
    
    // exluder of matched No names from allUsersNames array 
    const filteredNamesNo = function () {
        const arr = cuttedArray1.filter(e=>matchedNoNames.findIndex(i=>i === e) === -1);
        return arr;
    };

    const cuttedArrey2 = filteredNamesNo()

    //picking of random name from filtered array
    const next = cuttedArrey2[0];
    console.log("next",next, cuttedArrey2);

    //getter of next user data 
    async function getNewUser (name){   
        await API.getUserByName(name)
        .then(response => {
            setNextUserData(response.data);
        })
    };
    //setter of a matched Yes name in to array of loged users data
    async function setNewMatchesYes (name1, name2){
        await API.setUsersYesMatches(name1, name2)
        .then((response) => {
            console.log("setNewMatches",response);
            setStatus(false);
        })
    };
    //setter of a matched No name in to array of loged users data
    async function setNewMatchesNo (name1, name2){
        await API.setUsersNoMatches(name1, name2)
        .then((response) => {
            console.log("setNewMatches",response);
            setStatus2(false);
        })
    };

    const userForArr = nextUserData.userName;
    console.log ("userForArr", userForArr)

    const getNextUser = function () {
        // const next1 = next;
        
        // if (matchedYesNames.includes(next)){
        //     console.log ("UserAlreadyMatched")

        // } else 
      
   
        // if (next.localeCompare(newUserName)){
        //     console.log ("getNextUser", next)
        getNewUser(next)
        // getNewUserName(next)
            
        // } else if (next.localeCompare(newUserName)){
        //     console.log ("getNextUser - SAME1")
        //     getNewUser(next)
        //     getNewUserName(next)
        // } else {
        //     console.log ("getNextUser - SAME2")
        // };
    };
    
    //deleting user's name from allUsersNames array  
    const cutedArrOfAllUsersNames = function (){
        const arr1 = allUsersNames;
        // function checkUserName(name) {
        //     if (name !== nextUserData.userName) {
        //       return name;
        //     }
        //   }
        // const arr2 = arr1.filter(checkUserName)
        const arr2 = arr1.shift()
        console.log ("cutedArrOfAllUsersNames", arr1, nextUserData.userName);
        console.log(arr2)
        setAllNames(arr1)
    }

    function handleYesSubmit() {
        console.log("Yes");
        if(allNames.length>0){ 
           cutedArrOfAllUsersNames();

            setStatus(true);
            setNewMatchesYes(user.userName, nextUserData.userName);
            setMatchedYesName(matchedYesNames=> [...matchedYesNames, userForArr]);
            getNextUser(); 
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    function handleNoSubmit() {
        console.log("No")
        if(allNames.length>0){ 
            cutedArrOfAllUsersNames();
            setStatus2(true);
            setNewMatchesNo(user.userName, nextUserData.userName);
            setMatchedNoName(matchedNoNames=> [...matchedNoNames, userForArr]);
            getNextUser()
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    return (
        <View>
            <Navbar />
            <View style={{ backgroundColor: "rgb(232, 86, 86)", textAlign: "center", width: "80%", height: "110px", paddingTop: "2%", borderRadius: "25px", marginLeft: "9%", marginBottom: "3%", fontFamily: "Georgia, serif" }}>
                <Text style={{ fontSize : "24px" , color: "white", fontSize: "45px" }}>Get yo pup the lovin they deserve and match now!</Text>
            </View>
            <Container>
                <Row>
                    <Col size="md-3">
                        <SwipeBtn
                            size="lg"
                            variant="danger"
                            direction="left"
                            onClick={handleNoSubmit}
                        />
                         {status2 && (
                            <FlashMessage duration={10000} >
                               <Text style={{backgroundColor:"rgb(232, 86, 86)", fontSize:"25px", fontColor: "white", fontFamily: "Georgia, serif" , fontWeight: "bolder"}}>REJECTED!</Text>
                            </FlashMessage>
                        )}
                    </Col>
                    <Col size="md-6">
                        <CardTwo petName={nextUserData.petName} img1={nextUserData.petPhotoUrl} img2={nextUserData.userPhotoUrl} message={"User Pic"} messageTwo={"Dog Pic"}>
                            <View style={{float:"left" ,width:"50%"}}>
                            <View style={{ paddingTop: "10%", paddingLeft: "4%" }}><Text> Pet name:  &nbsp;&nbsp;{nextUserData.petName} </Text></View>
                            <View style={{ paddingTop: "12%", paddingLeft: "4%" }}><Text>Breed:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {nextUserData.breed}</Text> </View>
                            <View style={{ paddingTop: "12%", paddingLeft: "4%" }}><Text>Age:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {nextUserData.age}</Text> </View>
                            </View>
                            <View style={{float: "left" ,width:"50%" }}>
                            <View style={{marginTop:"12%", marginLeft: "5%" , fontSize:"25px"  }}><Text>Vaccinated: {vaccinated}</Text></View>
                            <View style={{ marginTop: "12%", marginLeft: "5%" , fontSize:"25px" }}><Text>Trained: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trained}</Text></View>
                            </View>
                        </CardTwo>
                    </Col>

                    <Col size="md-3">
                        <SwipeBtn
                            size="lg"
                            variant="success"
                            direction="right"
                            onClick={handleYesSubmit}
                        />
                        {status && (
                            <FlashMessage duration={500000} >
                               <Text style={{ fontWeight:"bolder" ,backgroundColor:"rgb(232, 86, 86)", fontSize:"25px", fontColor: "white", fontFamily: "Georgia, serif"}}>MATCHED!</Text>
                            </FlashMessage>
                        )}
    
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col size="md-10">
                        <View >
                        <ProfDetails>
                        <View> <Text>Username:&nbsp;{nextUserData.userName}</Text> </View>
                        <View style={{paddingTop: "3%"}}><Text>Location:&nbsp;&nbsp;&nbsp;&nbsp;{nextUserData.city}</Text></View>
                        <View style={{paddingTop: "3%" }}><Text>Zip Code:&nbsp;&nbsp;&nbsp;{nextUserData.zipCode}</Text></View>
                        <View style={{paddingTop: "3%" }}><Text>Join Date:&nbsp;&nbsp;{readableDate}</Text></View>
                        <View style={{paddingTop: "3%"}}><Text>About my pet:&nbsp;&nbsp;{nextUserData.info}</Text></View>
                        </ProfDetails>
                        </View>
                    </Col>
                </Row>
            </Container>
            {/* ----------------------Rendering Modal */}
            <Modal style={styles.myModal} show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title> <Text>Oooopsy!</Text></Modal.Title>
                </Modal.Header>
                <Modal.Body
                style={{fontweight:"bolder"}}
                >{isErrorMessage}</Modal.Body>
                <Modal.Footer>
                <Button style={{ height:"40px" ,width:"130px" , border:"1px solid black" ,float:"right" ,fontSize:"20px" ,marginRight:".2%" ,marginBottom:".3%" ,fontWeight:"bolder" ,backgroundColor:"white"}} onClick={hideModal}><Text>Ok</Text></Button>
                </Modal.Footer>
            </Modal>
            {/* ------------------------------------ */}
        </View>
    );
}
const styles = StyleSheet.create({
    myModal: {
        // backgroundImage: url("./images/dog-world-2.png"),
        backgroundColor:"rgb(232, 86, 86)",
        // background-blend-mode: hard-light;
        height: "378px"
    }
  });
