import React, {FC} from 'react';
import Paper from "@material-ui/core/Paper";
import StyledDivider from "./StyledDivider";
import Typography from "@material-ui/core/Typography";
import {Skeleton} from "@material-ui/lab";
import {WithStyles} from "@material-ui/core";
import withPostsEmptyStyles from "./postsEmptyStyles";

type PropsType = {
   isLoading: boolean,
   isOwner: boolean
}

const PostsEmpty: FC<PropsType & WithStyles> = ({isLoading, isOwner, classes}) => {
    return (
        <Paper className={classes.paper}>
            {!isOwner && <StyledDivider/>}
            {isLoading ?
                <div className={classes.emptyText}>
                    <Skeleton animation="wave" width="100%" className={"MuiTypography-body1"}/>
                </div>:
                <Typography variant="body1" className={classes.emptyText}>
                    There are no posts yet...
                </Typography>
            }
        </Paper>
    )
};

export default withPostsEmptyStyles(PostsEmpty);
