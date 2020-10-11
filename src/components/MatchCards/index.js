import React, { useState, useEffect, useContext } from "react";
import {Row } from "../Grid";
import Col from "../Col";
import Modal from 'react-bootstrap/Modal';
import Map from "../map";
import UserContext from "../../utils/UserContext";
import { View , Image, TextInput, Text , StyleSheet } from 'react-native';



export default function MatchCards(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = React.useState(false);
    const [thisUser, setThisUser] = useState("")
    const { userForMatchesPage } = useContext(UserContext)
    // const showModal = (errorMsg) => {
    //     setIsErrorMessage(errorMsg);
    //   };

    const hideModal = () => {
        setIsOpen(false);
    };
    console.log(props.arrayData)
    console.log(props)
    useEffect(() => {
        if (props.length === null) {
            setIsLoading(true)
        } if (props.length !== null) {
            setIsLoading(false)
        }
    }, [setIsLoading, props.length]
    )
    if (isLoading) {
        return (
            <View>
                <Text>No Current Matches</Text>
            </View>
        )
    } if (!isLoading) {
        async function showuserDetails(id) {
            setIsOpen(true);
            console.log(id)
            const index = userForMatchesPage.findIndex(p => p.userData.userName === id)
            setThisUser(userForMatchesPage[index].userData)

            // console.log(props.arrayData.map((item, userName , key) => (
            // key={...item.userName},
            // {item} = {userName}
            // console.log()
            // )) , "hello this is my console log")
        }
        return (
            <Container fluid>
                <Modal id={thisUser.userName} style={styles.userModalContent} show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title> <Text style={styles.modalHeader}>{thisUser.userName}'s Profile</Text></Modal.Title>
                        <Button style={styles.modalXBtn} onClick={hideModal}>X</Button>
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
                </Modal>
                {props.arrayData.map((item, myKey) => (
                    <View key={myKey}>
                        {console.log(myKey)}
                        {/* {console.log(item.userData.userName)} */}
                        <Row-fixed>
                        <View style={{display:"flex", width:"100%"}}>
                            <View className="mainCont ">
                                    <Col size="md-2" className="image-col">
                                    <View style={styles.image} >
                                        <View>
                                            <Image style={styles.img}  src={item.userData.petPhotoUrl} alt={item.userData.userName} />
                                            <View>
                                                <Text style={{fontSize : "10.72px"}}><Button id={item.userData.userName} style={styles.userNameBtn} onClick={(e) => (showuserDetails(e.target.id))}>{item.userData.userName}</Button></Text>
                                            </View>
                                        </View>
                                        </View>
                                    </Col>
                                    <Col size="md-7">
                                    <View style={styles.messages}>
                                        <Text style={styles.text} >{item.userData.userName}{props.message}</Text>
                                        </View>
                                    </Col>
                                    <Col size="md-3 ">
                                    <View style={styles.messageBtn} >
                                            <View style={{ borderTopRightRadius: "15px", borderBottomRightRadius: "15px", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} type="submit" className="btn" href={item.userData.email}><Text className="btnText" style={{ fontFamily: "Arial", fontWeight: "bolder" }}>Message Now</Text></View>
                                        </View>
                                    </Col>
                            </View>
                            </View>
                        </Row-fixed>
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
    modalXBtn : {
        // backgroundColor: "inherit", 
        textAlign: "center", 
        // cursor: "pointer", 
        // whiteSpace: "nowrap", 
        // border: "none", 
        // display: "inline-block", 
        padding: "8px 16px", 
        // verticalAlign: "middle", 
        // overflow: "hidden", 
        // textDecoration: "none", 
        // color: "inherit"
    },
    contentModalContent : {
        height: "400px",
        width: "auto",
        overflow: "scroll",
        backgroundColor:"rgb(232, 86, 86)" 
    },
    mapboxDiv: {
        height: "430px",
        maxHeight: "430px",
        width: "450px",
        maxWidth: "450px",
        marginTop : "10%"
    },
    image: {
    height: "100%",
    width: "37%",
    // float: "left",
    /* position: absolute; */
    paddingTop:"4%",
    paddingLeft: "4%",
    },
    img: {
        padding: "3%",
        height: "65%",
        width: "58%",
        backgroundColor: "blue",
        // borderRadius: "50px"
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
        marginLeft: "inherit",
        textAlign: "center",
        // whiteSpace: "nowrap",
        color:"black",
        marginTop: "3%"
    },
    text: {
    /* padding-top: 8%; */
    fontSize: 22,
    // fontWeight: 450
    /* float: left; */
    },
    messageBtn : {
           /* height: 100%; */
    width: "100%",
    // float: "right",
    position: "relative",
    /* white-space: nowrap; */
    marginLeft: "inherit"
    /* text-align: center; */
    /* margin-left: 29.5%; */ 
    }



  });