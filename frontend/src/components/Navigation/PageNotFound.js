import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';


function PageNotFound() {
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(clearLocations())
//   }, [dispatch])
    return (
      <div className="not-found">
        <p style={{fontWeight:'bold'}}>We are sorry. We cannot find the page/items you are looking for.</p>
        <p>Please try a new search above.</p>
        {/* <img src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/1c54cc25ce01/assets/img/svg_illustrations/cant_find_650x520_v2.svg"></img> */}
        <img src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"></img>
      </div>
    );
  }


  export default PageNotFound
