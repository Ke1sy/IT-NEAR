import Navbar from "./Navbar";
import {connect} from "react-redux";
import {getNewMessagesCount} from "../../redux/reducers/dialogs-selectors";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    newMessagesCount: number | null
}

const mapStateToProps = (state: AppStateType) => {
    return {
        newMessagesCount: getNewMessagesCount(state)
    }
};

export default connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(Navbar);
