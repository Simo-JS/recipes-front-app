import React, { useState } from "react";

import { SEARCH_RECIPES } from "../queries/index";

import SearchInput from "../components/SearchInput";
import SearchResult from "./SearchResult";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchHandle = async (client, searchTerm) => {
    console.log(searchTerm);
    const {
      data: { searchRecipes }
    } = await client.query({
      query: SEARCH_RECIPES,
      variables: {
        searchTerm
      }
    });
    setSearchResults(searchRecipes);
  };

  return (
    <>
      <SearchInput onSearch={searchHandle} />
      <SearchResult searchResults={searchResults} />
    </>
  );
};

export default Search;
