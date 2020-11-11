import React, { useState, useEffect, useContext } from "react";
import {Row , Container } from "../Grid";
import Col from "../Col";
// import Modal from 'react-bootstrap/Modal';
import Map from "../map";
import UserContext from "../../utils/UserContext";
import { View , Image, TextInput, Text , StyleSheet , Button, Alert , Modal } from 'react-native';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import API from "../../utils/API";
import UsersDetails from "../../pages/UsersDetails";
import { useNavigation } from '@react-navigation/native';




export default function MatchCards(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [thisUser, setThisUser] = useState("")
    // gets a list of all users
    const [allUserArray , setAllUserArray] = useState([])
    // mapped version of all user array , returned as a list of all users
    const [usersToFilter , setUsersToFilter] = useState([])
    // mapped version of get users for matches page, returned as a list
    const [getUsersForMatchesPageToMap , setGetUsersForMatchesPageToMap] = useState([])
    // filtered names to send back for complete objects to firebase
    const [filteredUsersForFirebase , setFilteredUsersForFirebase] = useState()
    const { userForMatchesPage , currentUser , getUsersForMatchesPage , setSelectedUserForUDPage } = useContext(UserContext)

    // const for modal
    const [modalVisible , setModalVisible] = useState(false)
    const [isOpen , setIsOpen] = useState(false)
    // const for selected user to display to modal
    const [selectedUser , setSelectedUser] = useState()
    const navigation = useNavigation()
    
    useEffect(()=> {
        // getallusers()
        sendBackUserArray()
    }, [sendBackUserArray]
    )

    // const getallusers = async (req , res) => {
    //     await API.getMatchesYesByName(
    //         currentUser.userName
    //     )
    //     .then((res) => setUserArray(res.data))
    //     .finally(sendBackUserArray)
    //     // console.log(userArray , "asdas")
    // }
    const sendBackUserArray =  async (req , res) => {
        setGetUsersForMatchesPageToMap(await getUsersForMatchesPage)
            console.log(getUsersForMatchesPage, "users for matches page on matches screen")
            await API.moreLoginStuff({
                 item : getUsersForMatchesPage
            })
            .then((res) => setAllUserArray(res.data.data))
            .then(filterArrayData)
            .then(setIsLoading(false))
    }
    const filterArrayData = async (req, res) => {
        const arr = allUserArray.map((item , myKey) => (
            setUsersToFilter(item)
            // console.log(item)
        ))
        console.log(getUsersForMatchesPageToMap , " ta mapppppss")
        console.log(usersToFilter , " ta filter")
        const filterKeyWords = allUserArray.filter((word) => getUsersForMatchesPageToMap.includes(word).valueOf())
        const otherArr =  filterKeyWords.map(async (item , myKey ) =>(
            await API.returnObjectsInYesArray({
                        myKey : item
            })
        .then((res) => console.log(res.data))

        ))
    }

    const getUserObject = value => async (req ,res) => {
        // setIsOpen(false)
        console.log(value)
        await API.getUserForMatchesModal(
             value
        )
        .then((res) => setSelectedUser(res.data.userStuff.undefined))
        // .then((res) => console.log(res.data.userStuff.undefined))        
        if(selectedUser === undefined){
            getUserObject()
        }
        if(selectedUser !== undefined){
            setSelectedUserForUDPage(selectedUser)
            navigation.navigate('usersDetails')
        }
    }



    //     setIsErrorMessage(errorMsg);
    //   };

    // const hideModal = () => {
    //     setIsOpen(false);
    // };
    // console.log(props.arrayData)
    // console.log(props)
    // useEffect(() => {
    //     if (props.length === null) {
    //         setIsLoading(true)
    //     } if (props.length !== null) {
    //         setIsLoading(false)
    //     }
    // }, [setIsLoading, props.length]
    // )
    if (isLoading) {
        return (
            <View>
                <Text>No Current Matches</Text>
            </View>
        )
    } if (!isLoading) {
        // async function showuserDetails(id) {
        //     setIsOpen(true);
        //     console.log(p , "these are p ")
        //     const index = userForMatchesPage.findIndex(p => p.userData.userName === id)
        //     setThisUser(userForMatchesPage[index].userData)
            

        //     userArray.map((item, userName , key) => (
        //     key={...item.userName},
        //     {item} = {userName}
        //     // console.log()
        //     )
        //     )
        // // }
        return (
            <Container fixed>
                {/* <Modal id={thisUser.userName} style={styles.userModalContent} show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title> <Text style={styles.modalHeader}>{thisUser.userName}'s Profile</Text></Modal.Title>
                        <Button style={styles.modalXBtn} onClick={hideModal}><Text>X</Text></Button>
                    </Modal.Header>
                    <View style={styles.contentModalContent} >
                        <Modal.Body>
                            <Row>
                            <Col size="md-8">
                                <View><Text style={{float:"left" , color:"white" , fontSize:"14%" , fontSize:"14%"}}>Location:</Text><Text style={{color:"white" , fontSize:"19px"}}>&nbsp;&nbsp; {thisUser.city}, {thisUser.zipCode}</Text></View>
                                <View><Text style={{float:"left" , margin:"auto" , color:"white" , fontSize:"14%"}}>Email:</Text> <Text style={{color:"white" , fontSize:"19px"}}>&nbsp;&nbsp;{thisUser.email}</Text></View>
                                <View><Text style={{ float:"left" , margin:"auto" , color:"white" , fontSize:"14%"}}>Pet Name:</Text> <Text style={{color:"white" , fontSize:"19px"}}>&nbsp;&nbsp; {thisUser.petName}</Text></View>
                                <View><Text style={{ float:"left" , margin:"auto" , color:"white" , fontSize:"14%"}}>Pet Age:</Text> <Text style={{color:"white" , fontSize:"19px"}}>&nbsp;&nbsp; {thisUser.age} </Text> </View>
                                <View style={styles.mapboxDiv}  >
                                    <Text style={{color:"white" , paddingTop:"6%" , textAlign:"center" , fontSize: "16px"}}>{thisUser.userName}'s Location</Text>
                                    <View style={{border:"solid white 1px" , marginTop:"5%" , marginBottom:".5%"}}></View>
                                    <Map>
                                    </Map>
                                </View>
                            </Col>
                        </Row>
                        </Modal.Body>
                    </View>
                </Modal> */}
                {getUsersForMatchesPageToMap.map((item, myKey) => (
                       <View key={myKey}>
                         <View style={{flexDirection: "row", width:"100%"}}> 
                             <View style={styles.mainCont}> 
                                     <View style={{flexDirection:"row"}}> 
                                     <View style={styles.image} > 
                                         <View> 
                                             <Image style={styles.img}  
                                            //  source={item.petPhotoUrl} 
                                             alt={item.userName} />
                                             <View> 
                                                     <TouchableWithoutFeedback 
                                                      id={item} style={styles.userNameBtn}  
                                                        onPress={getUserObject(item)}
                                                    > 
                                                          <View><Text style={{fontSize:10}}>{item}</Text></View>
                                                        </TouchableWithoutFeedback> 
                                             </View> 
                                         </View> 
                                         </View> 
                                     </View> 
                                     <View> 
                                     <View style={styles.messages}> 
                                         <Text style={styles.text}>{item}{props.message}</Text> 
                                         </View> 
                                     </View> 
                                     <View>
                                     <View style={styles.messageBtn} >
                                             <View style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} type="submit" className="btn" href={item.userName}><Text className="btnText" style={{ fontFamily: "Arial", fontWeight: "bold" }}>Message Now</Text></View> 
                                        </View>
                                     </View>
                                 </View> 
                             </View> 
                    </View> 
                  ))} 
                  
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    userModalContent: {
        overflow:"scroll"
    },
    modalHeader: {
        textAlign:"center",
        fontSize:25
    },
    mainCont : {
        height: 76,
        marginLeft: "2%",
        width: "95%",
        // overflow: hidden,
        // display: flex;
        flexWrap: "nowrap",
        flexDirection: "row",
        borderRadius: 17.5,
        backgroundColor: "white",
        marginBottom: "1.5%"
    },
    modalXBtn : {
        // backgroundColor: "inherit", 
        textAlign: "center", 
        // cursor: "pointer", 
        // whiteSpace: "nowrap", 
        // border: "none", 
        // display: "inline-block", 
        padding: 8 
        // verticalAlign: "middle", 
        // overflow: "hidden", 
        // textDecoration: "none", 
        // color: "inherit"
    },
    contentModalContent : {
        height: 400,
        width: "auto",
        overflow: "scroll",
        backgroundColor:"rgb(232, 86, 86)" 
    },
    mapboxDiv: {
        height: 430,
        maxHeight: 430,
        width: 450,
        maxWidth: 450,
        marginTop : "10%"
    },
    image: {
    height: "32%",
    width: "37%",
    // float: "left",
    /* position: absolute; */
    paddingTop:"1%",
    paddingLeft: "4%",
    },
    img: {
        padding: "3%",
        height: "65%",
        width: "58%",
        marginTop: 10,
        backgroundColor: "gray",
        borderRadius: 50
    },
    userNameBtn : {
        // border: "none",
        backgroundColor: "white"
    },
    messages : {
        height: "100%",
        width: "100%",
        /* float: left; */
        /* position: relative;  */
        // marginLeft: "inherit",
        textAlign: "center",
        // whiteSpace: "nowrap",
        color:"black",
        marginTop: "3%"
    },
    text: {
    /* padding-top: 8%; */
    fontSize: 12,
    marginLeft : -70,
    marginTop : 20
    // fontWeight: 450
    /* float: left; */
    },
    messageBtn : {
           /* height: 100%; */
    width: "100%",
    // float: "right",
    position: "relative",
    /* white-space: nowrap; */
    // marginLeft: "inherit"
    /* text-align: center; */
    /* margin-left: 29.5%; */ 
    }



  });