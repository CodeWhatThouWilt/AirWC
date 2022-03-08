import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { getSpots } from "./store/spots";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Spots from "./components/Spots";
import ManageSpots from "./components/ManageSpots";
import NewListing from "./components/NewListing";
import Spot from "./components/Spot";

function App() {
  
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const spots = useSelector((state) => Object.values(state.spotsState));
  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path='/manage-spots'>
            <ManageSpots spots={spots} />
          </Route>

          <Route exact path='/new-listing'>
            <NewListing />
          </Route>

          <Route path='/spots/:spotId'>
            <Spot spots={spots} />
          </Route>

          <Route exact path='/spots'>
            <Spots spots={spots} />
          </Route>

          <Route exact path='/'>
            <Homepage spots={spots} />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;