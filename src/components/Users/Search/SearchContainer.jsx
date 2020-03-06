import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Search from "./Search";
import queryString from 'query-string';

const SearchContainer = (props) => {
    const searchRequest = queryString.parse(props.location.search).search;
    return <Search {...props} searchRequest={searchRequest}/>
};

export default compose(
    withRouter
)(SearchContainer);