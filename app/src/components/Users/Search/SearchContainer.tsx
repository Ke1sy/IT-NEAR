import React, {FC} from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Search from "./Search";
import queryString from 'query-string';

type OwnPropsType = {
    onChangeSearchText: ({searchText}: {searchText: string}) => void
}

// Your component own properties
type PropsType = RouteComponentProps<any> & OwnPropsType

const SearchContainer: FC<PropsType> = ({onChangeSearchText, location}) => {
    const searchRequest = queryString.parse(location.search).search;
    return <Search onChangeSearchText={onChangeSearchText} searchRequest={searchRequest}/>
};

const SearchWithRouter = withRouter(SearchContainer);

export default SearchWithRouter