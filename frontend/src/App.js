import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from './components/Spot/SpotPage';
import SpotId from './components/Spot/SpotId';
import CreateForm from './components/Spot/SpotNew';
import ManageSpot from './components/Spot/SpotManage';
import UpdateSpotForm from './components/Spot/SpotUpdate';
import Footer from "./components/Footer/Footer";
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path='/spots/new'>
          <CreateForm />
        </Route>
        <Route path='/spots/current'>
          <ManageSpot />
        </Route>
        <Route path="/spots/:spotId/edit">
          <UpdateSpotForm />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotId />
        </Route>
        <Route exact path='/'>
          <Spots />
        </Route>
        <Route path='*'>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;