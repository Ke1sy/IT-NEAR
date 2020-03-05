import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Search from "./Search";


export default compose(
    withRouter
)(Search);