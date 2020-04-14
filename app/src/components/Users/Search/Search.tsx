import React, {FC} from 'react';
import SearchReduxForm from "./SearchForm";
import {Typography, Chip, WithStyles} from "@material-ui/core";
import withSearchStyles from "./searchStyles";

type PropsType = {
    onChangeSearchText: ({searchText}: {searchText: string}) => void
    searchRequest: string | string[] | null | undefined,
    onResetSearch: () => void,
    isLoading: boolean
}

const Search: FC<PropsType & WithStyles> = ({onChangeSearchText, searchRequest, onResetSearch, isLoading, classes}) => {
    return (
        <div className={classes.search}>
            {searchRequest &&
            <Typography variant="body2">
                Found on query:
                <Chip label={searchRequest} onDelete={onResetSearch} color="secondary" className={classes.searchTxt} />
            </Typography>
            }
            <SearchReduxForm onSubmit={onChangeSearchText} onResetSearch={onResetSearch} isLoading={isLoading}/>
        </div>
    )
};


export default withSearchStyles(Search);
