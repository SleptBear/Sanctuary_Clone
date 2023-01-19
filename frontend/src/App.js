import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotShow from "./components/SpotShow";
import CreateSpotForm from "./components/CreateSpotForm";

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
          <Route exact path='/' component={SpotsIndex}></Route>
          <Route exact path='/spots/:spotId' component={SpotShow}></Route>
          <Route path='/spots' component={CreateSpotForm}></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
