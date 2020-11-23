import { useCallback, useState, useEffect, useContext } from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import VenueAutoComplete from "components/Search/VenueAutoComplete/";
import Location from "components/Search/Location/";
import Button from "components/Button/";
import 'styles/Venue.scss';
import 'styles/Location.scss';
import { YelpContext } from 'YelpContext.js';
import { Link, useHistory } from 'react-router-dom';
import 'styles/Home.scss'

const Search = props => {
  const history = useHistory();
  const {
    setRefinedSeed,
    results,
    appState,
    yelpSearch,
    autoComplete,
    resetAutoComplete,
    yelpAutoComplete,
    resetFilters,
    populateCategories,
    addResults,
    getPriceFilterMode,
    loadingSearch,
    setLoadingSearch
  } = useContext(YelpContext);
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  // function validate() {
  //   if (location == "") {

  //   }
  // }

  // function reset() {
  //   // resets the text data

  // // }
  useEffect(() => {
    populateCategories(results);
    addResults(results);
    getPriceFilterMode(results);
    setRefinedSeed(results);
    // eslint-disable-next-line
  }, [results]);

  useEffect(() => {
    setLocation(appState.center.city);
  }, [appState]);

  const setVenueAndHandleSearch = (text) => {
    setVenue(text);
    setAutoCompleteFalse();
    handleSearch(text);

    history.push('/search')
  };

  const setVenueAndAutoComplete = (text) => {
    if (text === "") {
      resetAutoComplete();
    }
    if (text !== "") {
      resetAutoComplete();
      yelpAutoComplete(text, appState.center.lat, appState.center.lng);
    }
    setVenue(text);
    setAutoCompleteTrue();
  };

  const setAutoCompleteFalse = () => {
    setShowAutoComplete(false);
  };

  const setAutoCompleteTrue = () => {
    setShowAutoComplete(true);
  };

  const handleSearch = (name) => {
    console.log("loading? ", loadingSearch);
    setLoadingSearch(true);
    if (name) {
      yelpSearch(name, location);
      console.log("loading? ", loadingSearch);
    } else {
      yelpSearch(venue, location);
    }
    resetFilters();
  };


  return (
    <div className={props.isHome ? 'home-search' : "search-container"}>
      <Venue venue={venue} onChange={setVenueAndAutoComplete} onClick={setVenueAndAutoComplete} 
      isHome={props.isHome}/>
      {showAutoComplete &&
        <VenueAutoComplete
          data={autoComplete}
          setAutoCompleteFalse={setAutoCompleteFalse}
          onClick={setVenueAndHandleSearch}
          isHome={props.isHome}
        />
      }
      <Location location={location} onChange={setLocation} isHome={props.isHome}/>
      <Link to={'/search'}>
        <Button onClick={() => handleSearch()} message={props.buttonMessage} search isHome={props.isHome}/>
      </Link>
    </div>
  );
};

export default Search;