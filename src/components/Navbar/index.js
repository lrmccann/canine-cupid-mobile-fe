import React from "react"
import { MyProfileButton, MatchNowButton, MatchesButton, LogOutButton, AboutUsButton, HomeButton, SignupButton } from "../Button"
import { View , Text, Button , StyleSheet } from "react-native";



export function Navbar(props) {
  return (
    <View style={styles.navabr}>
      <MyProfileButton />
      <MatchNowButton />
      <MatchesButton />
      <LogOutButton />
    </View>
  );
}

export function NavbarNolinks(props) {
  console.log(props)
  return (
    <View style={styles.navbarLogin}>
      <SignupButton />
      <Button style={styles.navBarLoginBtn}
        onClick={props.children.props.onClick}
      > <Text> Log In </Text>
        </Button>
      <AboutUsButton />
    </View>
  );
}

export function NavbarAboutUs(props) {
  console.log(props)
  return (
    <View style={styles.navbarLogin}>
      <HomeButton
        {...props}
      />
    </View>
  );
}
export function NavbarSignUp(props) {
  console.log(props)
  return (
    <View style={styles.navBarSignUp}>
      <HomeButton
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    overflow: "hidden",
    backgroundColor: "rgb(232, 86, 86)",
    fontFamily: "Arial",
    height: "50px",
    marginBottom: "4%",
    width: "100%"
  },
  navbarLogin : {
    overflow: "hidden",
    backgroundColor: "white",
    height: "50px",
    marginTop: "1%",
    width: "100%"
  }, 
  navbarLoginButton : {
    height:"40px",
    width:"130px",
    // border:"1px solid black",
    // float:"right",
    fontSize:20,
    marginRight:".7%",
    marginTop:".28%",
    fontWeight:"bold",
    color:"black",
    backgroundColor:"white"
  },
  navBarSignUp : {
    overflow: "hidden",
    height: "50px",
    backgroundColor: "rgb(232, 86, 86)"
  },
});


export default Navbar;