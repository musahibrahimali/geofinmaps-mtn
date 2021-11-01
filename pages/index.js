import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { GoogleMapView } from '../client/client';
import {useStateValue} from '../provider/AppState';
import {ClientNavbar, ShimmerPage} from "../global/global";
import actionTypes from "../Utils/Utils";
import axios from "axios";
const cableUrl = "https://us-central1-roam-ghana.cloudfunctions.net/getAllCableData";

const Home = () => {
  /* data layer */
  const [{ user, isDrawerOpen}, dispatch] = useStateValue();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState(null);

  let cableData;
  let cables = [];

  const getData = async () => {
    await axios(cableUrl).then((response) => {
      cableData = response.data.cables;
    });

    cableData.map((cable) => {
      cables.push(cable);
    });

    setData(cables);

    if(cables !== null){
      getAllCoordinates();
      setLoading(false);
    }
  }

  const getAllCoordinates = () => {
    let coordinateData = [];
    if(cables){
      cables.map((cable) => {
        coordinateData.push({
          lat: parseFloat(cable.coord.lat),
          lng: parseFloat(cable.coord.lng),
        });
      });
      setCoordinates(coordinateData);
    }else{
      console.log("data not in yet")
    }
  }

  useEffect(() => {
    if(!user){
      router.replace('/auth').then(() => {});
    }

    getData().then(() => {
      setLoading(false);
    });

  },[user, router]);

  const handleOpenDrawer = () => {
    if(isDrawerOpen){
      dispatch({
        type: actionTypes.OPEN_DRAWER,
        isDrawerOpen: false,
      });
    }else{
      dispatch({
        type: actionTypes.OPEN_DRAWER,
        isDrawerOpen: true,
      });
    }
  }


  return (
    <>
        <ClientNavbar handleOpenDrawer={handleOpenDrawer}/>
      {
        loading ?
            <ShimmerPage /> :
            <GoogleMapView cableData={data} coordinates={coordinates}/>
      }
    </>
  )
}

export default Home;
