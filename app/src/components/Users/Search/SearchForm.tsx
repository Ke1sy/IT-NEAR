import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {RenderField} from "../../Forms/components/FormControl";
import {minLength, required} from "../../../utils/validate";
import {IconButton, Paper, makeStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
const minLength3 = minLength(3);

const useStyles = makeStyles(theme => ({
    root: {
        margin: '15px 0',
        padding: '2px 20px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        position: 'relative'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: theme.palette.primary.main
    },
    iconButton: {
        marginRight: 10,
        padding: 10,
        color: theme.palette.primary.main
    },
    resetBtn: {
        position: 'absolute',
        right: 15,
        cursor: 'pointer',
        opacity: 0.5,

        '&:hover': {
            opacity: 1
        }
    }
}));

type FormDataType = {
    searchText: string,
}

type OwnPropsType = {
    onResetSearch: () => void
}

type PropsType = InjectedFormProps<FormDataType> & OwnPropsType;

const SearchForm: FC<PropsType> = ({handleSubmit, submitting, reset, onResetSearch}) => {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled={submitting}>
                <SearchIcon/>
            </IconButton>
            <Field
                name="searchText"
                type="text"
                label="Search"
                component={RenderField}
                autocomplete="off"
                placeholder="Type search request..."
                validate={[required, minLength3]}
            />
            <ClearIcon color="secondary" onClick={reset} className={classes.resetBtn}/>
        </Paper>
    )
};

const SearchReduxForm = reduxForm<FormDataType, OwnPropsType>({
    form: 'search'
})(SearchForm);


export default SearchReduxForm;