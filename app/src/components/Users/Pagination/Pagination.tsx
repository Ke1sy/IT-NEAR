import React, {FC} from 'react';
import PaginationComponent, { usePagination } from '@material-ui/lab/Pagination';
import {makeStyles} from "@material-ui/core";

type PropsType = {
    totalPages: number,
    currentPage: number,
    onSetCurrentPage: (event: React.ChangeEvent<unknown>, page: number) => void
}

const useStyles = makeStyles(theme => ({
    root: {
     margin: '30px 0',
        "& .Mui-selected": {
         pointerEvents: 'none'
        },

        "& .MuiPagination-ul": {
         justifyContent: 'center'
        }
    },
}));
const Pagination: FC<PropsType> = ({totalPages, currentPage, onSetCurrentPage}) => {
    const classes = useStyles();
    return (
        <PaginationComponent count={totalPages} page={currentPage} onChange={onSetCurrentPage} color="primary" className={classes.root}/>
    )
};


export default Pagination;
