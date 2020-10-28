import React, { useContext ,useEffect,useState } from "react";
import Header from ".././components/Header";
import UserContext from "../utils/UserContext";
// import { Row, Container } from "../components/Grid";
import Card from "../components/Card";
import ProfDetails from "../components/ProfDetails";
// import Col from "../components/Col";
// import Navbar from "../components/Navbar";
// import { EditProfileButton } from "../components/Button";
// import Map from "../components/map";
// // import Moment from 'react-moment';
import { Text, View , StyleSheet, Image, ScrollView } from "react-native";
import { EditProfileButton, MatchesButton, MatchNowButton } from "../components/Button";



export default function Profile () {
      const { user } = useContext(UserContext)
      const [newUser , setNewUser] = useState({})

return(
  <ScrollView
  showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}
  >
<View style={styles.profileCont}>
    <View style={styles.headerCont}>
<Header />
</View>
<MatchesButton />
<MatchNowButton />
<Card
// userPhotoUrl = {userPhoto}
// petPhotoUrl={petPhoto}
// userPhotoUrl = {user.userPhotoUrl}
// petPhotoUrl={user.petPhotoUrl}
petname={user.petName}
breed={user.breed}
age={user.age}
/>

{/* <Image style={styles.card} source={require('./images/dog-for-login.png')} /> */}
<ProfDetails>
  <View>
      <View style={{ paddingTop: "2%" , marginLeft: "2.5%" }}><Text style={{fontWeight : "bold" , fontSize : 15}}>Username :&nbsp;{user.userName} </Text></View>
      <View style={{ paddingTop: "2%" , marginLeft: "2.5%" }}><Text style={{fontWeight : "bold" , fontSize : 15}}>Location: &nbsp;{user.city}</Text></View>
      <View style={{ paddingTop: "2%" , marginLeft: "2.5%" }}><Text style={{fontWeight : "bold" , fontSize : 15}}>Zip Code: &nbsp;{user.zipCode} </Text></View>
      <View style={{ paddingTop: "2%", marginLeft: "2.5%"}}><Text style={{fontWeight : "bold" , fontSize : 15}}>Interests: &nbsp;{user.interests}</Text></View>
      <View style={{ paddingTop: "2%" , marginLeft: "2.5%" }}><Text style={{fontWeight : "bold" , fontSize : 15}}>More about my pet: &nbsp;{user.info}</Text></View>
      {/* <View style={{ paddingTop: "4%" , marginLeft: "2.5%" }}><Text>Join Date: &nbsp;&nbsp;&nbsp;{user.readableDate}</Text></View> */}
      <View style={{paddingLeft : 233 , paddingTop : 15 }}>
      <EditProfileButton />
      </View>
      </View>
      </ProfDetails>




</View>
{/* <TabBar /> */}
</ScrollView>
)
}
const styles = StyleSheet.create({
    profileCont: {
      // backgroundColor : "rgb(232, 86, 86)",
      height: "100%",
      width:"100%",
      // justifyContent:"center"
    },
    headerCont: {
      flex : 2,
      height : "50%",
      width: "100%"
    },
    })
// let Profile = (props) => {
//     const { user } = useContext(UserContext)
//     const [clicked , setClicked] = useState("hello")
//     console.log("user profile page", user);

//     let interests = "";
//     let vaccinated = "";
//     let trained = "";

//     if ('park' in user && user.park === "on")
//     if (user.vaccinated === true) {
//         vaccinated = "Yes"
//     } else if (user.vaccinated === false) {
//         vaccinated = "No"
//     }

//     if (user.trained === true) {
//         trained = "Yes"
//     } else if (user.trained === false) {
//         trained = "No"
//     }

//     if (user.park === true) { interests = interests + "Playing in the Park. " }
//     if (user.ball === true) { interests = interests + "Playing with a ball. " }
//     if (user.frisbee === true) { interests = interests + "Playing with a frisbee. " }

//     // let readableDate = <Moment format="YYYY/MM/DD">{user.date}</Moment>
//     console.log(props)
//     console.log(clicked)
//     return (
//         <View>
//             <Navbar
//             color="white"
//             />
//             <Container>
//             <View style={{ backgroundColor: "rgb(232, 86, 86)", textAlign: "center", width: "80%", height: "100%", paddingTop: "2%", borderRadius: "25px", marginLeft: "9%", marginBottom: "6.5%", fontFamily: "Georgia, serif" }}>
//                 <Text style={{fontSize:"24px", color: "white", fontSize: "45px" }}>Welcome to your profile {user.userName}!</Text>
//             </View>
//             </Container>
//             <Container fluid>
//                 <Row-fluid>
//                     <View style={{display:"flex" ,margin:"auto"}}>
//                     <Col size="md-6">
//                         <Card petName={user.petName} petPhotoUrl={user.petPhotoUrl} messageTwo={"Dog Pic"} message = {"My Pic"} img1 = {user.petPhotoUrl} img2={user.userPhotoUrl} >
//                             <View style={{float:"left" , width:"50%" }}>
//                             <View style={{marginTop:"5%", marginLeft: "5%" , fontSize:"25px" }}><Text>Pet name: &nbsp;&nbsp;{user.petName}</Text></View>
//                             <View style={{ paddingTop: "7%", marginLeft: "5%" , fontSize:"25px" }}><Text>Breed: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.breed}</Text></View>
//                             <View style={{ paddingTop: "7%", marginLeft: "5%" , fontSize:"25px" }}><Text>Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.age}</Text></View>
//                             </View>
//                             <View style={{float: "left" ,width:"50%" }}>
//                             <View style={{marginTop:"12%", marginLeft: "5%" , fontSize:"25px"  }}><Text>Vaccinated: {vaccinated}</Text></View>
//                             <View style={{ marginTop: "12%", marginLeft: "5%" , fontSize:"25px" }}><Text>Trained: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{trained}</Text></View>
//                             </View>
//                         </Card>
//                     </Col>
//                     {/* </Row-fixed>
//                     <Row-fixed> */}
//                     <Col size="md-5">
//                     <View style={{width:"100%", height:"100%" , overflow:"none"}}>
//                         <ProfDetails callbackStuff={setClicked} marginTop="5%" >
//                             <View style={{ paddingTop: "2%" , marginLeft: "2.5%" }}><Text>User Name : {user.userName}</Text> </View>
//                             <View style={{ paddingTop: "4%" , marginLeft: "2.5%" }} ><Text>Location: &nbsp;&nbsp;&nbsp;&nbsp;{user.city}</Text></View>
//                             <View style={{ paddingTop: "4%" , marginLeft: "2.5%" }}><Text>Zip Code: &nbsp;&nbsp;&nbsp;&nbsp;{user.zipCode}</Text> </View>
//                             <View style={{ paddingTop: "4%", marginLeft: "2.5%"}}><Text>Interests: &nbsp;{interests}</Text></View>
//                             <View style={{ paddingTop: "4%" , marginLeft: "2.5%" }}><Text>More about my pet: &nbsp;&nbsp;{user.info}</Text></View>
//                             <View style={{ paddingTop: "4%" , marginLeft: "2.5%" }}><Text>Join Date: &nbsp;&nbsp;&nbsp;{readableDate}</Text></View>
//                             {/* <div style={{paddingTop: "3%"}}>About my pet: &nbsp;{interests}</div> */}
//                             <EditProfileButton />
//                         </ProfDetails>
//                         </View>
//                     </Col>
//                     </View>
//                 </Row-fluid>
//                 <Col size="md-12">
//                     <View style={{ backgroundColor: "rgb(232, 86, 86)", textAlign: "center", width: "80%", height: "110px", paddingTop: "2%", borderRadius: "25px", marginLeft: "9%", marginTop:"10%" , fontFamily: "Georgia, serif" }}>
//                         <Text style={{fontSize: "24px",  color: "white", fontSize: "45px" }}>Pet-friendly parks near you</Text>
//                     </View>
//                 </Col>
//                 <Map />
//             </Container>
//         </View>
//     )
// }

// export default Profile;