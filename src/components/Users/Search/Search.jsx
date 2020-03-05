import React from 'react';
import styles from './search.module.scss';
import SearchReduxForm from "./SearchForm";
import queryString from 'query-string';

const Search = ({history, location, onChangeSearchText}) => {
    // const parsed = queryString.parse(location.search);

    const onSubmit = ({searchText}) => {

        // history.push({search: 'search=' + searchText});
    };

    return (
        <div className={styles.search}>
            {/*<p>Found on query: {parsed.search}</p>*/}
            <SearchReduxForm onSubmit={onChangeSearchText}/>
        </div>
    )
};


export default Search;
