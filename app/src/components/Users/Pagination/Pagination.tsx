import React, {FC} from 'react';
import PaginationComponent from '@material-ui/lab/Pagination';
import {makeStyles} from "@material-ui/core";
import withWidth from '@material-ui/core/withWidth';
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

type PropsType = {
    totalPages: number,
    currentPage: number,
    onSetCurrentPage: (event: React.ChangeEvent<unknown>, page: number) => void,
    width: Breakpoint
}

const useStyles = makeStyles(theme => ({
    root: {
     margin: '40px 0',
        "& .Mui-selected": {
         pointerEvents: 'none'
        },

        "& .MuiPagination-ul": {
         justifyContent: 'center'
        }
    },
}));
const Pagination: FC<PropsType> = ({totalPages, currentPage, onSetCurrentPage, width}) => {
    const classes = useStyles();
    return (
        <PaginationComponent size={width === 'xs' ? 'small': 'medium'} count={totalPages} page={currentPage} onChange={onSetCurrentPage} color="primary" className={classes.root}/>
    )
};


export default  withWidth()(Pagination);
