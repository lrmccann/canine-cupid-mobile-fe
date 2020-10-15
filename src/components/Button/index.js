import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { Text, View , Image , Button , StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    function handleClick() {
       navigation.navigate('profile')
    }
    return (
        <View style={styles.LoginButton}>
        <Button title=" Log In"
        // onPress={handleClick} 
        onPress={props.onPress}
        >
        </Button>
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
            <Button title="Sign up"
            onPress={handleClick} >
            </Button>
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
    const history = useHistory();
    function handleClick() {
        history.push("/aboutus");
    }
    return (
        <View style={styles.abtUs}>
        <Button 
        onClick={handleClick} >
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
        <Button style={{marginLeft:"22%"}}
            onPress={handleClick}
            title="Edit Profile" >
                {/* <Text style={styles.editBtn}>
             Edit Profile 
            </Text> */}
        </Button>
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
    const history =  useHistory();
    
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
            history.push("/matchnow")
        }) 
        
    }

    function handleClick() {
       
        console.log ("length",allUsersNames.length)
        if(allUsersNames.length>0){ 
            // const rand = function (items) {
            // return items[~~(items.length * Math.random())];
            // }
            if(allUsersNames.length>1){
            const firstUser = allUsersNames[0]
            getUserData(firstUser)
            const arr = allUsersNames
            const newArr = arr.shift()
            console.log("newArr",newArr)
            getAllUsersNames(arr)
            } else {
                const firstUser = allUsersNames[0]
                getUserData(firstUser)
            }
        } else {
            showModal("You've already reviewed all available users, please check your Matches.")
        };
    };

    return (
        <View>
        <View>
            <View>
            <Button 
            // className="btn" 
            onClick={()=>handleClick()} >
                <Text style={styles.btnLogin}>
                     Match Now 
            </Text>
            </Button>
            </View>
            {/* ----------------------Rendering Modal */}
            <View style={styles.myModal}>
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
            </View>
            {/* ------------------------------------ */}
        </View>
        </View>
    );
}

export function MatchesButton() {
    const {userForMatchesPage, getAllMatchesForMatchesPage, user} = useContext(UserContext)
    const history = useHistory();
    let newVar = user
    const getUserDataById = async () => {
        await API.getMatchesYesByName(newVar.userName)
        .then(response => getAllMatchesForMatchesPage(response.data))
        
    }
    async function handleClick(user) {
        console.log(userForMatchesPage, "anytext")
        await getUserDataById(user)
        .then(history.push("/matches"))
    }
    return (
        <View style={styles.btn}>
    <Button 
    // className="btn" 
    onClick={handleClick} >
        <Text style={styles.btnLogin}>
       Matches
      </Text>
    </Button>
    </View>
    );
}

export function LogOutButton() {
    const { user, getData } = useContext(UserContext)
    const history = useHistory();

    useEffect(
        ()=>{localStorage.setItem('user', JSON.stringify(user));
      }, [user])

    function handleClick() {
        getData("")
        history.push("/login");
    }
    return (
        <View style={styles.btn}>
        <Button 
        // className="btn" 
        onClick={handleClick} >
                <Text style={styles.btnLogin}>
                   Log Out 
                  </Text>
        </Button>
        </View>
    );
}


const styles = StyleSheet.create({
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
        flexDirection: "row"
    },
    messagebutton: {
        height: 73,
        width: 228,
        // borderRadius:"0 17.5px 17.5px 0"
    },
    editProfile: {
        height: 40,
        width: 140,
        // border: "1px solid black",
        // float: "right",
        marginTop: "5%",
        fontSize: 20,
        // fontWeight: "bold",
        backgroundColor: "rgb(232, 86, 86)"
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
        height:40,
        width:130,
        // border:"1px solid black",
        // float:"right",
        fontSize:20,
        marginRight:".2%",
        marginTop:".28%",
        // fontWeight:"bold",
        color:"black",
        backgroundColor:"white",
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
        flexDirection: "row"
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
        backgroundColor:"white"
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