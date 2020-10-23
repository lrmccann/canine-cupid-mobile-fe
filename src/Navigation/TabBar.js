// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground } from "react-native";
// import posed from "react-native-pose";
// import Screen from "../screens/index"
// import { NavigationContext, useNavigation } from '@react-navigation/native';
// import NavBar from "./MainStackNavigator";
// import { State } from "react-native-gesture-handler";
// import routes from "../../app.json";

// const windowWidth = Dimensions.get("window").width;
// const tabWidth = windowWidth / 5 * ( 4/5 * 8.95/10);
// const SpotLight = posed.View({
//   route0: { x: 0, scaleY:1.25,transition: { type: 'spring', damping:20, mass:1 }},
//   route1: { x: tabWidth , scaleY:1.25, transition: { type: 'spring', damping:20, mass:1 }},
//   route2: { x: tabWidth * 2, scaleY:1.25,  transition: { type: 'spring', damping:20, mass:1 }},
//   route3: { x: tabWidth * 3, scaleY:1.25, transition: { type: 'spring', damping:20, mass:1 }},
// //   route4: { x: tabWidth * 4, scaleY:1.25, transition: { type: 'spring', damping:20, mass:1 }}
// });

// const Scaler = posed.View({
//     active: { scale: 1.15 },
//     inactive: { scale: 1 }
//   });

// const S = StyleSheet.create({
//   container:{flexDirection: "row", backgroundColor:"#3baf7d" ,width:'100%', justifyContent:'space-between', height: 60, elevation: 2, marginTop:1},
//   logoContainer:{ flex:0.25, width:'20%'},
//   tabContainer: {  flexDirection: "row", backgroundColor:"#3baf7d" , justifyContent: "space-around", width:'80%',height: 60, marginRight:10, },
//   tabButton: {  justifyContent: "center", alignItems: "center"  },
//   spotLight: { width: tabWidth, height: "100%", backgroundColor: "#ffffff", elevation: 5 }
// });


// const TabBar = props => {
  
//   const {
//     renderIcon,
//     getLabelText,
//     activeTintColor,
//     inactiveTintColor,
//     onTabPress,
//     onTabLongPress,
//     // getAccessibilityLabel,
//     // navigation
//   } = props;

//   // const navigation = useNavigation()
//   const { 
//     // routes ,
//      index: activeRouteIndex 
//   } = useState() ;
//   const newRoutes = routes.routes
//   console.log(routes.routes)
//   // const navigation = useNavigation()
 
//   return (
//     <View style={S.container}>
//         <View style={S.logoContainer} >
//         </View>    
//         <View style={S.tabContainer}>
//         <View style={StyleSheet.absoluteFillObject}>
//             <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}/>
//         </View>
//         {newRoutes.map((route, routeIndex) => {
//             const isRouteActive = routeIndex === activeRouteIndex;
//             const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
//             return (
//             <TouchableOpacity
//                 key={routeIndex}
//                 style={S.tabButton}
//                 onPress={() => { 
//                   // navigation.navigate(route.name);
//                   console.log(route.name)
//                 }}
//                 onLongPress={() => {
//                 onTabLongPress({ route });
//                 console.log(route)
//                 }}
//                 // accessibilityLabel={getAccessibilityLabel({ route })
//               // }
//             >
//                 <View style={S.scaler} pose={isRouteActive ? "active" : "inactive"}>
//                     <View style={{flexDirection:'row', alignItems:'center'}}>
//                         {/* <Text>{renderIcon({ route, focused: isRouteActive, tintColor })}</Text> */}
//                         {/* <Text style={{color:tintColor, marginLeft:5}}>{getLabelText(route.label) }</Text> */}
//                     </View>
//                 </View>

//             </TouchableOpacity>
//             );
//         })}
//         <View style={{width:'40%', flexDirection:'row', margin:5, alignItems:"stretch", justifyContent:'space-around'}}>
//           <TouchableOpacity style={{backgroundColor:'#00aeef', padding:20, marginRight:100 }}>
//             <Text style={{color:'#ffffff'}}>EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={{backgroundColor:'#00aeef', padding:10, }}>
//             <Text style={{color:'#ffffff'}}>AR</Text>
//           </TouchableOpacity>
//           </View>
//         </View>
//     </View>
//   );
// };

// export default TabBar;