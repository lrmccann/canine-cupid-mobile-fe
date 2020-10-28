import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { Text, View , Image , Button , StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-community/async-storage';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";

export function MatchButton(props) {
    return ( 
        <View style={styles.matchbtn}>
        <Button {...props}>{props.text}</Button>
        </View>
    );
};

export function MessageButton(props) {
    return ( 
        <View style={styles.messagebutton}>
        <Button {...props.children}>{props.text} </Button>
        </View>
    );
};

export function ModalButton(props) {
    return ( 
        <View style={styles.LoginModalButton}>
        <Button
            onClick={props.onClick}
            style={props}>
                <Text>
            Okay
            </Text>
        </Button>
        </View>
    );
};
export function XButton(props) {
    console.log(props.onClick)
    return ( 
        <View style={styles.XButton}>
        <Button
            onClick={props.onClickOne}
            style={props}>
                <Text>
            X
            </Text>
        </Button>
        </View>
    );
};
// export function LoginButton(props){
//     return (
//         <View >
//         <Button
//         onClick={props.onClick}
//         style={props}
//         >
//             <Text>
//             Log In
//             </Text>
//         </Button>
//         </View>
//     );
// }
export function LoginButton( props) {
    const navigation = useNavigation()
    const { user  } = useContext(UserContext)
    const STORAGE_KEY = user.sessionToken
    // console.log(STORAGE_KEY)
    AsyncStorage.setItem('STORAGE_KEY' , STORAGE_KEY);
    console.log(AsyncStorage , "herrrrooooooo")
    function handleClick() {
       navigation.navigate('profile')
    }
    return (
        <View style={styles.LoginButton}>
        <TouchableWithoutFeedback
        onPress={handleClick} 
        // onPress={props.onPressOfBtn}
        >
            <Text style={styles.loginText}>Login</Text>
        </TouchableWithoutFeedback>
        </View>
    );
}

export function LoginModalButton(props) {
    console.log(props)
    return ( 
        <View style={styles.LoginModalButton}>
        <Button
            // className="LoginModalButton topright" 
            {...props}
            onClick={props.onClick}
            >
        <Text>
            X
            </Text>
        </Button>
        </View>
    );
};

export function SignupButton(props) {
    const navigation = useNavigation()
        function handleClick() {
            navigation.navigate('signup');
        }
        return (
            <View style={styles.Signuphome}>
                <Text style={{fontSize: 17.5 , color : "black"}}>Don't have an account?</Text>
            <TouchableWithoutFeedback
            onPress={handleClick} >
                <Text style={{marginLeft: 61, marginTop : 5 , fontSize : 15 , fontWeight : "bold" , color : "blue"}} >Register</Text>
            </TouchableWithoutFeedback>
            </View>
        );
}
export function HomeButton(props) {
    const history = useHistory();
    function handleClick() {
        history.push("/login");
    }
    return (
        <View style={styles.HomeButton}>
        <Button 
        onClick={handleClick} >
            <Text>
            Home Page
            </Text>
        </Button>
        </View>
    );
}
export function AboutUsButton(props) {
    const navigation = useNavigation()
    // const history = useHistory();
    function handleClick() {
        // history.push("/aboutus");
        navigation.navigate('aboutUs')
    }
    return (
        <View style={styles.abtUs}>
        <Button 
        title="Our Story"
        onPress={handleClick} >
            <Text>
            Our Story
            </Text>
        </Button>
        </View>
    );
}
export function EditProfileButton() {
    const navigation = useNavigation()
    function handleClick() {
        navigation.navigate('editProfile');

    }
    return (
        <View style={styles.editProfile}>
        <TouchableWithoutFeedback 
            onPress={handleClick}>
                <Text style={{flexWrap : "wrap" , color : "white" , fontSize : 15 , paddingTop : 5 , paddingLeft : 3  }}>Edit Profile</Text>
                {/* <Text style={styles.editBtn}>
             Edit Profile 
            </Text> */}
        </TouchableWithoutFeedback>
        </View>
    );
}

export function MyProfileButton() {
    const history = useHistory();
    function handleClick() {
        history.push("profile");
    }
    return (
        <View style={styles.btn}>
        <Button 
        onClick={handleClick} >
                <Text style={styles.btnLogin}>
            Sign up
           </Text>
        </Button>
        </View>
    );
}

export function MatchNowButton() {
    const { allUsersNames, getAllUsersNames, getNewUserData, getNewUserName } = useContext(UserContext)
    const navigation = useNavigation()
    // const history =  useHistory();
    
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
        
    async function getUserData (firstUser) {
        console.log ("getUserUser",firstUser)
        await API.getUserByName(firstUser)
        // .then(response=>console.log(response))
        .then((response) =>{
             getNewUserData(response.data); 
             getNewUserName(response.data.userName)
            // history.push("/matchnow")
            navigation.navigate('matchNow')
        }) 
        
    }

    async function handleClick() {
       
        console.log ("length",allUsersNames.length)
        if(allUsersNames.length>0){ 
            // const rand = function (items) {
            // return items[~~(items.length * Math.random())];
            // }
            if(allUsersNames.length>1){
            const firstUser = await allUsersNames[0]
            await getUserData(firstUser)
            const arr =  allUsersNames
            const newArr = arr.shift()
            console.log("newArr",newArr)
             getAllUsersNames(arr)
            } else {
                const firstUser =  allUsersNames[0]
                 getUserData(firstUser)
            }
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    return (
        <View style={styles.matchNowBtn}>
            <TouchableWithoutFeedback
            // className="btn" 
            onPress={()=>handleClick()} >
                <Text style={styles.matchNowText}> Match Now </Text>
            </TouchableWithoutFeedback>
            {/* ----------------------Rendering Modal */}
            {/* <View style={styles.myModal}>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>
                        <Text>
                        Oooopsy!
                        </Text>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body 
                //  style={{fontweight:"bolder"}}
                >{isErrorMessage}</Modal.Body>
                <Modal.Footer>
                    <View style={styles.modalOK}>
                <Button onClick={hideModal}> <Text> Ok </Text></Button>
                    </View>
                </Modal.Footer>
            </Modal>
            </View> */}
            {/* ------------------------------------ */}
        </View>
    );
}

export function MatchesButton() {
    const {userForMatchesPage, getAllMatchesForMatchesPage, user} = useContext(UserContext)
    const navigation = useNavigation()
    // const history = useHistory();
    let newVar = user
    const getUserDataById = async () => {
        await API.getMatchesYesByName(newVar.userName)
        .then(response => getAllMatchesForMatchesPage(response.data))
        
    }
    async function handleClick(user) {
        console.log(userForMatchesPage, "anytext")
        await getUserDataById(user)
        // .then(history.push("/matches"))
        .then(navigation.navigate('matches'))
    }
    return (
        <View style={styles.matchesBtn}>
    <TouchableWithoutFeedback
    // className="btn" 
    onPress={handleClick} >
        <Text style={styles.matchesBtnText}> Matches </Text>
    </TouchableWithoutFeedback>
    </View>
    );
}

export function LogOutButton() {
    const { user, getData } = useContext(UserContext)
    // const history = useHistory();
    // const navigation = useNavigation()

    useEffect(
        ()=>{AsyncStorage.setItem('user', JSON.stringify(user));
      }, [user])

    function handleClick() {
        getData("")
        navigation.navigate("home");
    }
    return (
        <View style={styles.btn}>
        <Button 
        title="Log Out"
        // className="btn" 
        onPress={handleClick} >
                <Text style={styles.btnLogin}>
                   Log Out 
                  </Text>
        </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    btn: {
        height: 30,
        width: 40
    },
    // matchbtn: {
    //     height: "100px",
    //     width: "500px",
    //     border: "1px solid black",
    //     float: "right",
    //     marginTop: "50px",
    //     marginRight: "100px",
    //     borderRadius: "10px",
        // fontSize: 25,
    //     backgroundColor: "rgb(227, 227, 230)"
    // },
    LoginButton : {
        flexDirection: "row",
        backgroundColor : "white",
        width : "80%",
        borderRadius : 35,
        height : 65,
        justifyContent : "center",
        marginTop : -210,
        marginLeft : 42.5
    },
    loginText : {
        fontSize : 25,
        padding : 17
    },
    messagebutton: {
        height: 73,
        width: 228,
        // borderRadius:"0 17.5px 17.5px 0"
    },
    editProfile: {
        height: 45,
        width: 100,
        padding : 8,
        // border: "1px solid black",
        // float: "right",
        // marginTop: "8%",
        // fontWeight: "bold",
        backgroundColor: "rgb(232, 86, 86)",
        borderTopLeftRadius : 25, 
        borderTopRightRadius : 25, 
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },
    XButton: {
        // border: "none",
        // display: "inline-block",
        padding: 16,
        // verticalAlign: "middle",
        overflow: "hidden",
        // textDecoration: "none",
        // color: "inherit",
        // backgroundColor: "inherit",
        textAlign: "center",
        // cursor: "pointer",
        // whiteSpace: "nowrap"
    },
    LoginModalButton:{
        // border: "none",
        // display: "inline-block",
        padding:  16,
        // verticalAlign: "middle",
        overflow: "hidden",
        // textDecoration: "none",
        // color: "inherit",
        // backgroundColor: "inherit",
        textAlign: "center",
        // cursor: "pointer",
        // whiteSpace: "nowrap"
    },
    signUpButton:{
        height:50,
        width:130,
        // border:"1px solid black",
        // float:"right",
        fontSize:20,
        marginRight:".2%",
        marginTop:"10%",
        // fontWeight:"bold",
        color:"black",
        backgroundColor:"white",
    },
    matchesBtn : {
        flexDirection : "row-reverse",
        marginTop : 10
    },
    matchesBtnText : {
        fontSize : 20,
        color : "blue"
    },
    matchNowBtn : {
        flexDirection : "row",
        // marginTop : -23.5, 
        marginLeft : 8
    },
    matchNowText : {
        fontSize : 20,
        color : "blue"
    },
    HomeButton: {
        height:40,
        width:130,
        // border:"1px solid black",
        // float:"left",
        fontSize:20,
        marginRight:".2%",
        marginTop:".28%",
        // fontWeight:"bold",
        color:"black",
        backgroundColor:"white"
    },
    Signuphome : {
        flexDirection: "column",
        marginTop: 20,
        marginLeft : 118

    },
    abtUs: {
        height:40,
        width:130,
        // border:"1px solid black",
        // float:"left",
        fontSize:20,
        marginRight:".2%",
        marginTop:".28%",
        // fontWeight:"bold",
        color:"black",
        // backgroundColor:"white"
    },
    btnLogin: {
        color: "white",
        fontSize: 18
    },
    editBtn: {
        color: "white",
        marginTop: " 5%"
    },
    modalOK : {
        height:40,
        width:130,
        // border:"1px solid black",
        // float:"right",
        fontSize:20,
        marginRight:".2%",
        marginTop:".28%",
        // fontWeight:"bolder",
        backgroundColor:"white"
    },
    myModal: {
        // backgroundImage: url("./images/dog-world-2.png"),
        backgroundColor: "rgb(232, 86, 86)",
        // backgroundBlendMode: "hard-light",
        height: 378
    }
})