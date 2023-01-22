import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/Spots/SpotsIndex";
import SpotShow from "./components/Spots/SpotShow";
import SpotCard from "./components/Card/SpotCard";

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
        </Switch>
      )}
      {/* <SpotCard></SpotCard> */}
    </>
  );
}

export default App;
