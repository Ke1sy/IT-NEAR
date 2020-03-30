import React from 'react';
import chatPlaceholder from "../../assets/images/chat-bg.svg";
import {makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() =>
    ({
        empty: {
            width: '100%',
            height: '100%',
            padding: 30,
            display: 'flex',
            flexDirection: 'column'
        },
        emptyImg: {
            background: `url(${chatPlaceholder}) no-repeat center` ,
            backgroundSize: 'contain',
            flexGrow: 1
        },
        emptyText: {
            margin: '30px 0',
            textAlign: 'center'
        }
    }),
);
const EmptyChat = () => {
    const classes = useStyles();

    return (
        <div className={classes.empty}>
            <div className={classes.emptyImg}/>
            <div className={classes.emptyText}>
                <Typography variant="h6">
                    Select conversation to display
                </Typography>
                <Typography variant="body2">
                    To start a new conversation just click the message button from a person profile
                </Typography>
            </div>
        </div>
    )
};

export default EmptyChat;
