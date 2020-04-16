import React, {FC} from 'react';
import errorImg from '../../assets/images/404.png';
import {WithStyles} from "@material-ui/core";
import withNotFoundStyles from "./notFoundStyles";

const NotFound: FC<WithStyles> = ({classes}) => {
    return (
        <div className={classes.notFound}>
            <img src={errorImg} alt=""/>
        </div>
    )
};

export default withNotFoundStyles(NotFound);
