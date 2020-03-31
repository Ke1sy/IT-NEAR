import React, {FC} from 'react';
import styles from './search.module.scss';
import SearchReduxForm from "./SearchForm";
import {makeStyles, Typography, Chip} from "@material-ui/core";

type PropsType = {
    onChangeSearchText: ({searchText}: {searchText: string}) => void
    searchRequest: string | string[] | null | undefined,
    onResetSearch: () => void
}

const useStyles = makeStyles(theme => ({
    searchTxt: {
        marginLeft: 10
    },
    search: {
        marginBottom: 40,
        width: '100%'
    },
}));



const Search: FC<PropsType> = ({onChangeSearchText, searchRequest, onResetSearch}) => {
    const classes = useStyles();

    return (
        <div className={styles.search}>
            {searchRequest &&
            <Typography variant="body2">
                Found on query:
                <Chip label={searchRequest} onDelete={onResetSearch} color="secondary" className={classes.searchTxt} />

            </Typography>
            }
            <SearchReduxForm onSubmit={onChangeSearchText} onResetSearch={onResetSearch}/>
        </div>
    )
};


export default Search;
