import React from "react";
import 'styles/Search.scss';
import Venue from "components/Search/Venue/";
import Location from "components/Search/Location/";
import Button from "components/Button/";

const Search = props => {

  const handleSearch = () => {
    
    //make dan's api request
    const queryLocation = ''; 
    const queryTerm = '';
    
    // <-- api function call goes here getResults(queryTerm, queryLocation) 
    
    
    // need both results state and callback to seed refinedResults
    const { results, setRefinedSeed } = props;
    setRefinedSeed(results);

  };
  return (
    <div className="search-container">
      <Venue />
      <Location />
      <Button onClick={handleSearch} message={props.buttonMessage} search />
    </div>
  );
};

export default Search;