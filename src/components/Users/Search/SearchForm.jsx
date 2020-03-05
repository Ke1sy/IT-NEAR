import React from 'react';
import {Field, reduxForm} from "redux-form";
import styles from "./search-form.module.scss";
import {renderField} from "../../Forms/components/FormControl";
import {minLength, required} from "../../../utils/validate";

const minLength3 = minLength(3);
const SearchForm = ({handleSubmit, submitting}) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Field
                name="searchText"
                type="text"
                component={renderField}
                placeholder="Type search request..."
                validate={[required, minLength3]}
            />

            <button type="submit" disabled={submitting} className={styles.button}>
                Search
            </button>
        </form>
    )
};

const SearchReduxForm = reduxForm({
    form: 'search'
})(SearchForm);


export default SearchReduxForm;