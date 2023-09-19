import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots/SpotsIndex";
import SpotShow from "./components/Spots/SpotShow";
import SpotCard from "./components/Card/SpotCard";
import UserBookings from "./components/Bookings/UserBookings";
import PageNotFound from "./components/Navigation/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
  <>
      <Navigation isLoaded={isLoaded} />
      <br></br>
      <br></br>
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={SpotsIndex}></Route>
          <Route exact path='/spots/:spotId' component={SpotShow}></Route>
          <Route exact path='/trips' component={UserBookings}></Route>
          <Route path='/*' component={PageNotFound}></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
