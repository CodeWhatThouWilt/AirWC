import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { getAllBookings } from "./store/bookings";
import { getSpots } from "./store/spots";

import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Spots from "./components/Spots";
import ManageSpots from "./components/ManageSpots";
import Spot from "./components/Spot";
import ManageBookings from "./components/ManageBookings";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getSpots)
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path='/manage-bookings'>
            <ManageBookings />
          </Route>

          <Route exact path='/manage-spots'>
            <ManageSpots />
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

          <Route path='/' >
            404 Not found.
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;