import React from "react";
import { Col, Row, Container } from "../components/Grid";
import {NavbarAboutUs} from '../components/Navbar';
import Header from "../components/Header";
import { Text , View , StyleSheet } from "react-native";


export default function aboutUs() {
        return(
            <View style={styles.aboutUsPageContent}>
                <Header />
                <NavbarAboutUs/>
                <Container>
                <Row>
                    <Col size="lg-12">
                    <View style={styles.aboutUsMainCont}>
                    <Text style={styles.aboutUsText}>
                  Coronavirus has impacted our world in many ways, one of which being the recent skyrocket in animal adoption rates.
                  Shelters everywhere have been cleared by people looking for four-legged friends, and while staying home with them 24/7 was initially great, our pups are getting just as stir-crazy as we are.
                  That’s where Canine Cupid comes in.
                  </Text>
                  <Text style={styles.aboutUsText} >
                  Canine Cupid is the dog-matching app you and your pup have been waiting for.
                  Just make an account outlining your dog’s likes, dislikes, and personality traits to match them with a friend that is just as special as they are.
                  </Text>
                  <Text style={styles.aboutUsText}>
                  Grab your mask, your pup’s leash and head out for a (socially-distanced) playdate!
                  </Text>
                    </View>
                    </Col>

                </Row>

                </Container>

            </View>
    )}

    const styles = StyleSheet.create({
        aboutUsPageContent: {
            backgroundColor:"rgb(232, 86, 86)"
        },
        aboutUsText : {
            fontSize: 22, 
            padding: "2%" ,
            fontFamily: 'Karla sans-serif Poppins sans-serif Quicksand sans-serif'
        },
        aboutUsMainCont : {
            marginLeft:"5%", 
            height: "470px",
             width: "90%", 
            //  border: "solid black 1px", 
             backgroundColor: "white", 
             marginTop:"5%", 
            marginBottom:"5%"
        }

      });