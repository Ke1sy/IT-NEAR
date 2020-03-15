import React, {FC} from 'react';
import styles from './search.module.scss';
import SearchReduxForm from "./SearchForm";

type PropsType = {
    onChangeSearchText: ({searchText}: {searchText: string}) => void
    searchRequest: string | string[] | null | undefined
}

const Search: FC<PropsType> = ({onChangeSearchText, searchRequest}) => {
    return (
        <div className={styles.search}>
            {searchRequest &&
            <p>Found on query: {searchRequest}</p>
            }
            {/*todo type for redux form*/}
            <SearchReduxForm onSubmit={onChangeSearchText}/>
        </div>
    )
};


export default Search;
