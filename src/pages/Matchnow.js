import React, { useContext, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Row, Container } from "../components/Grid";
import CardTwo from "../components/CardTwo";
import SwipeBtn from "../components/SwipeBtn";
import ProfDetails from "../components/ProfDetails";
import Col from "../components/Col";
// import Navbar from "../components/Navbar";
import API from "../utils/API";
import UserContext from "../utils/UserContext"
// import Moment from 'react-moment';
import FlashMessage from "react-flash-message";
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
// import Swipeable from 'react-native-swipeable';
import { TouchableHighlight } from "react-native-gesture-handler";


export default function Matchnow() {

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
    console.log("matchedYesName", matchedYesNames);

    const [matchedNoNames, setMatchedNoName] = useState(user.matchesNo)
    console.log("matchedNoName", matchedNoNames);

    const [nextUserData, setNextUserData] = useState(newUserData);

    const [allNames, setAllNames] = useState(allUsersNames);

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
        const arr = allUsersNames.filter(e => matchedYesNames.findIndex(i => i === e) === -1);
        return arr;
    };
    //filtered array
    const cuttedArray1 = filteredNamesYes();

    // exluder of matched No names from allUsersNames array 
    const filteredNamesNo = function () {
        const arr = cuttedArray1.filter(e => matchedNoNames.findIndex(i => i === e) === -1);
        return arr;
    };

    const cuttedArrey2 = filteredNamesNo()

    //picking of random name from filtered array
    const next = cuttedArrey2[0];
    console.log("next", next, cuttedArrey2);

    //getter of next user data 
    async function getNewUser(name) {
        await API.getUserByName(name)
            .then(response => {
                setNextUserData(response.data);
            })
    };
    //setter of a matched Yes name in to array of loged users data
    async function setNewMatchesYes(name1, name2) {
        await API.setUsersYesMatches(name1, name2)
            .then((response) => {
                console.log("setNewMatches", response);
                setStatus(false);
            })
    };
    //setter of a matched No name in to array of loged users data
    async function setNewMatchesNo(name1, name2) {
        await API.setUsersNoMatches(name1, name2)
            .then((response) => {
                console.log("setNewMatches", response);
                setStatus2(false);
            })
    };

    const userForArr = nextUserData.userName;
    console.log("userForArr", userForArr)

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
    const cutedArrOfAllUsersNames = function () {
        const arr1 = allUsersNames;
        // function checkUserName(name) {
        //     if (name !== nextUserData.userName) {
        //       return name;
        //     }
        //   }
        // const arr2 = arr1.filter(checkUserName)
        const arr2 = arr1.shift()
        console.log("cutedArrOfAllUsersNames", arr1, nextUserData.userName);
        console.log(arr2)
        setAllNames(arr1)
    }

    function handleYesSubmit() {
        console.log("Yes");
        if (allNames.length > 0) {
            cutedArrOfAllUsersNames();

            setStatus(true);
            setNewMatchesYes(user.userName, nextUserData.userName);
            setMatchedYesName(matchedYesNames => [...matchedYesNames, userForArr]);
            getNextUser();
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    function handleNoSubmit() {
        console.log("No")
        if (allNames.length > 0) {
            cutedArrOfAllUsersNames();
            setStatus2(true);
            setNewMatchesNo(user.userName, nextUserData.userName);
            setMatchedNoName(matchedNoNames => [...matchedNoNames, userForArr]);
            getNextUser()
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            {/* <View>  */}
            {/* <Navbar /> */}
            {/* <View style={{ 
                // backgroundColor: "rgb(232, 86, 86)",
             textAlign: "center", width: "100%", height: 900, paddingTop: "2%", fontFamily: "Georgia, serif" }}> */}
            <Text style={{ fontSize: 20, color: "black" }}>Get yo pup the lovin they deserve and match now!</Text>
            <View style={styles.matchNowCont}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableHighlight
                        style={styles.swipeable}
                        // title="idkfive"
                        // size="lg"
                        // variant="danger"
                        // direction="left"
                        onPress={handleNoSubmit}
                    ><Text>Swipe no</Text></TouchableHighlight>
                    {/* {status2 && (
                            <FlashMessage duration={10000} >
                               <Text style={{backgroundColor:"rgb(232, 86, 86)", fontSize:25, fontColor: "white", fontFamily: "Georgia, serif" , fontWeight: "bolder"}}>REJECTED!</Text>
                            </FlashMessage>
                        )} */}
                    <View style={styles.card}>
                        <CardTwo petName={nextUserData.petName} breed={nextUserData.breed}
                            age={nextUserData.age} userName={newUserData.userName} email={nextUserData.email}
                            city={newUserData.city}
                            img1={nextUserData.petPhotoUrl} img2={nextUserData.userPhotoUrl}
                            message={"User Pic"} messageTwo={"Dog Pic"}>
                            <View style={{ float: "left", width: "50%" }}>
                                <Text style={{ paddingTop: "10%", paddingLeft: "4%" }}>Pet name:  &nbsp;&nbsp;{nextUserData.petName}</Text>
                                <Text style={{ paddingTop: "12%", paddingLeft: "4%" }}>Breed:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{nextUserData.breed}</Text>
                                <Text style={{ paddingTop: "12%", paddingLeft: "4%" }}>Age:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{nextUserData.age}</Text>
                            </View>
                            <View style={{ float: "left", width: "50%" }}>
                                {/* <View style={{marginTop:"12%", marginLeft: "5%" , fontSize:"25px"  }}><Text>Vaccinated: {vaccinated}</Text></View> */}
                                {/* <View style={{ marginTop: "12%", marginLeft: "5%" , fontSize:"25px" }}><Text>Trained: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trained}</Text></View> */}
                            </View>
                        </CardTwo>
                    </View>

                    <TouchableHighlight
                        style={styles.swipeableTwo}
                        // title="idkfour"
                        // size="lg"
                        // variant="success"
                        // direction="right"
                        onPress={handleYesSubmit}
                    >
                        <Text>Swipe yes</Text>
                    </TouchableHighlight>
                    {/* {status && (
                            <FlashMessage duration={500000} >
                               <Text style={{ fontWeight:"bolder" ,backgroundColor:"rgb(232, 86, 86)", fontSize:25, fontColor: "white", fontFamily: "Georgia, serif"}}>MATCHED!</Text>
                            </FlashMessage>
                        )} */}
                </View>
                <View style={{ position: "absolute", marginTop: 500 }} >
                    {/* <View style={{flexDirection : "row"}}> */}
                    {/* <View style={{flexDirection : "column"}}> */}
                    <ProfDetails>
                        <View style={{ paddingTop: "4%", marginLeft: "2.5%" }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>Username :&nbsp;{nextUserData.userName} </Text></View>
                        <View style={{ paddingTop: "6%", marginLeft: "2.5%" }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>Location: &nbsp;{nextUserData.city}</Text></View>
                        <View style={{ paddingTop: "6%" , marginLeft: "2.5%" }}><Text style={{fontWeight : "bold" , fontSize : 15}}>Zip Code: &nbsp;{nextUserData.zipCode} </Text></View>
                        <View style={{ paddingTop: "6%", marginLeft: "2.5%" }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>Interests: &nbsp;{nextUserData.interests}</Text></View>
                        <View style={{ paddingTop: "6%", marginLeft: "2.5%" }}><Text style={{ fontWeight: "bold", fontSize: 15 }}>More about my pet: &nbsp;{nextUserData.info}</Text></View>
                    </ProfDetails>
                    {/* </View> */}
                    {/* <View style={{paddingTop: "3%" }}><Text>Join Date:&nbsp;&nbsp;{readableDate}</Text></View> */}
                    {/* </Col> */}
                    {/* </View> */}
                </View>
            </View>
            {/* ----------------------Rendering Modal */}
            {/* <Modal style={styles.myModal} show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title> <Text>Oooopsy!</Text></Modal.Title>
                </Modal.Header>
                <Modal.Body
                style={{fontweight:"bolder"}}
                >{isErrorMessage}</Modal.Body>
                <Modal.Footer>
                <Button title="idktwo" style={{ height:40 ,width:130 ,float:"right" ,fontSize:20 ,marginRight:".2%" ,marginBottom:".3%" ,fontWeight:"bolder" ,backgroundColor:"white"}} onClick={hideModal}><Text>Ok</Text></Button>
                </Modal.Footer>
            </Modal> */}
            {/* ------------------------------------ */}
            {/* </View> */}
            {/* </View> */}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    myModal: {
        // backgroundImage: url("./images/dog-world-2.png"),
        backgroundColor: "rgb(232, 86, 86)",
        // background-blend-mode: hard-light;
        // height: 378
    },
    matchNowCont: {
        // flex: 20,
        // backgroundColor: "rgb(232, 86, 86)",
        height: 900
    },
    swipeable: {
        // flex: 10,
        opacity: 0.1,
        backgroundColor: "rgb(100, 100 , 100 )",
        // float: "right",
        height: 480,
        width: 30,
        // zIndex: 100,
        position: "absolute",
        flexDirection: "column"
    },
    swipeableTwo: {
        backgroundColor: "rgb(200, 200 , 200 )",
        height: 480,
        width: 30,
        // zIndex: 1,
        position: "absolute",
        // marginLeft: "50%",
        marginLeft: 240,
        opacity: 0.1
    },
    card: {
        alignSelf: "center"
    }
});
