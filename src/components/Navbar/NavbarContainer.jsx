import Navbar from "./Navbar";
import {connect} from "react-redux";
import {getNewMessagesCount} from "../../redux/reducers/dialogs-selectors";

const mapStateToProps = (state) => {
    return {
        newMessagesCount: getNewMessagesCount(state)
    }
};

export default connect(mapStateToProps)(Navbar);
