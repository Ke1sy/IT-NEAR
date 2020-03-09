import {addPost} from "../../../redux/reducers/profile-reducer";
import Posts from "./Posts";
import {connect} from 'react-redux'
import { getPosts } from "../../../redux/reducers/profile-selectors";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/reducers/types";

type MapStatePropsType = {
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    addPost: (text: string) => void
}

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: getPosts(state)
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost})(Posts);
