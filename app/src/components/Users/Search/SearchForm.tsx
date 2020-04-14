import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {RenderField} from "../../Forms/components/FormControl";
import {minLength, required} from "../../../utils/validate";
import {IconButton, Paper, WithStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {Skeleton} from '@material-ui/lab';
import withSearchFormStyles from "./searchFormStyles";

const minLength3 = minLength(3);

type FormDataType = {
    searchText: string,
}
type OwnPropsType = {
    onResetSearch: () => void,
    isLoading: boolean
}
type PropsType = InjectedFormProps<FormDataType> & OwnPropsType & WithStyles;

const SearchForm: FC<PropsType> = ({handleSubmit, submitting, isLoading, classes}) => {
    return (
        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
            {isLoading ?
                <Skeleton animation="wave" height={40} width='100%'/>
                : <>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled={submitting}>
                        <SearchIcon/>
                    </IconButton>
                    <Field
                        name="searchText"
                        type="search"
                        label="Search"
                        component={RenderField}
                        autoComplete="off"
                        placeholder="Type search request..."
                        validate={[required, minLength3]}
                    />
                </>
            }
        </Paper>
    )
};

const SearchReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'search'
})(withSearchFormStyles(SearchForm));

export default SearchReduxForm;