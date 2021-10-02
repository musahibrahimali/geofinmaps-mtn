import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
import { GoogleMapView } from '../client/client';
import {useStateValue} from '../provider/AppState';
import {ClientNavbar} from "../global/components/globalComponents";
import actionTypes from "../Utils/Utils";

const Home = () => {
  const router = useRouter();

  /* data layer */
  const [{ user, isDrawerOpen}, dispatch] = useStateValue();
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

  useEffect(() => {
    if(!user){
      // router.replace('/auth').then(result => console.log(result));
    }else if(user.isAdmin){
      router.replace('/admin').then(result => console.log(result));
    }
  },[router, user]);

  return (
    <>
        <ClientNavbar handleOpenDrawer={handleOpenDrawer}/>
        <GoogleMapView />
    </>
  )
}

export default Home;
