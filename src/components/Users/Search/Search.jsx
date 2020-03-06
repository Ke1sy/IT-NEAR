import React from 'react';
import styles from './search.module.scss';
import SearchReduxForm from "./SearchForm";

const Search = ({onChangeSearchText, searchRequest}) => {

    return (
        <div className={styles.search}>
            {searchRequest &&
            <p>Found on query: {searchRequest}</p>
            }
            <SearchReduxForm onSubmit={onChangeSearchText}/>
        </div>
    )
};


export default Search;
