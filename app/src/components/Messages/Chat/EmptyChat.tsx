import React, {FC} from 'react';
import {Hidden, Typography, WithStyles} from "@material-ui/core";
import withEmptyChatStyles from "./emptyChatStyles";

const EmptyChat:FC<WithStyles> = ({classes}) => {
    return (
        <div className={classes.empty}>
            <div className={classes.emptyImg}/>
            <Hidden mdDown>
                <div className={classes.emptyText}>
                    <Typography variant="h6">
                        Select conversation to display
                    </Typography>
                    <Typography variant="body2">
                        To start a new conversation just click the message button from a person profile
                    </Typography>
                </div>
            </Hidden>
        </div>
    )
};
export default withEmptyChatStyles(EmptyChat);
