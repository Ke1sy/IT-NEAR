import React, {FC} from 'react';
import {compose} from "redux";
import PaginationComponent from '@material-ui/lab/Pagination';
import {WithStyles, WithWidth, withWidth} from "@material-ui/core";
import withPaginationStyles from "./paginationStyles";

type PropsType = {
    totalPages: number,
    currentPage: number,
    onSetCurrentPage: (event: React.ChangeEvent<unknown>, page: number) => void,
}

const Pagination: FC<PropsType & WithWidth & WithStyles> = ({classes, totalPages, currentPage, onSetCurrentPage, width}) => {
    return (
        <PaginationComponent size={width === 'xs' ? 'small': 'medium'} count={totalPages} page={currentPage} onChange={onSetCurrentPage} color="primary" className={classes.root}/>
    )
};

export default compose(
    withWidth(),
    withPaginationStyles
)(Pagination) as FC<PropsType>;
