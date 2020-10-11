
import React, { useRef, useEffect, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import UserContext from "../../utils/UserContext";
import { View , StyleSheet } from 'react-native';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG9zcmVtYTIiLCJhIjoiY2s5em5zZjB2MGN2bTNncDYyM2Ruc2FyZSJ9.piNzfWJ9-dRIsVM3le57gg';

export default function Map  ()  {
  const { currentUserIp } = useContext(UserContext)
  const mapContainerRef = useRef(currentUserIp);
  console.log(currentUserIp)

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.6298, 41.8781],
      zoom: 13,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // add geolocation to mapbox
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );


    // clean up on unmount
    // return () => map.remove();
  }, [mapContainerRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return <View style={styles.mapBorder}> <View style={styles.mapContainer} ref={mapContainerRef}></View> </View>;

};


const styles = StyleSheet.create({
  mapBorder: {
	/* border: rgb(232, 86, 86) dashed 10px; */
	height: "100vh",
	margin: "auto",
	bottom: "0",
	left: "0",
	right: "0",
	maxHeight: "360px",
    /* max-height: 482px; */
	maxWidth: "400px",
	/* max-width: 650px; */
	zIndex:1
  },
  mapContainer: {
	// border: "rgb(232, 86, 86) dashed 10px",
	padding: "4px",
	height: "100%",
	margin: "auto",
	marginTop: "7.5%",
    maxHeight: "510px",
	maxWidth: "650px",
	zIndex: 1
  }
});