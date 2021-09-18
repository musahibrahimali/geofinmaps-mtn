import { useRouter } from 'next/router';
import React from 'react';
import { AuthLanding, GoogleMapView } from '../client/client';
import {useStateValue} from '../provider/AppState';

const Home = () => {
  const [{user}] = useStateValue();
  const router = useRouter();
  return (
    <>
        {
          user.isAdmin ? router.replace('/admin') :
          user ? <GoogleMapView /> : <AuthLanding />
        }
    </>
  )
}

export default Home;
