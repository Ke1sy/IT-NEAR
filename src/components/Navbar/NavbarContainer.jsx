import Navbar from "./Navbar";
import {connect} from "react-redux";

const mapStateToProps = ({dialogsReducer: {newMessagesCount}}) => {
    return {newMessagesCount}
};

export default connect(mapStateToProps)(Navbar);
