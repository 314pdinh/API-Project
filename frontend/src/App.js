import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from './components/SpotPage';
import SpotId from './components/SpotId';
import CreateForm from './components/SpotNew';
import ManageSpot from './components/SpotManage';
import UpdateSpot from './components/SpotUpdate';
import ManageReviews from "./components/ReviewsManage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <Spots />
          </Route>
          <Route path='/spots/new'>
            <CreateForm />
          </Route>
          <Route path='/spots/current'>
            <ManageSpot />
          </Route>
          <Route exact path={'/reviews/current'}>
            <ManageReviews />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdateSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotId />
          </Route>
        </Switch>}
    </>
  );
}

export default App;