import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Spots from "./components/Spots";
import ManageSpots from "./components/ManageSpots";
import NewListing from "./components/ManageSpotModal/NewListing";
import Spot from "./components/Spot";
import EditListing from "./components/ManageSpotModal/EditListing";

import { getSpots } from "./store/spots";

function App() {
  
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path='/manage-spots'>
            <ManageSpots />
          </Route>

          <Route exact path='/new-listing'>
            <NewListing />
          </Route>

          <Route exact path='/edit-listing'>
            <EditListing />
          </Route>

          <Route path='/spots/:spotId'>
            <Spot />
          </Route>

          <Route exact path='/spots'>
            <Spots />
          </Route>

          <Route exact path='/'>
            <Homepage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;