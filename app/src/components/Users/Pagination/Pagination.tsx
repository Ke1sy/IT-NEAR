import React, {FC} from 'react';
import styles from './pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PropsType = {
    totalPages: number,
    currentPage: number,
    onSetCurrentPage: ({selected}: {selected: number}) => void,
}

const Pagination: FC<PropsType> = ({totalPages, currentPage, onSetCurrentPage}) => {
    return (
        <div className={styles.pagination}>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                forcePage={currentPage - 1}
                onPageChange={onSetCurrentPage}
                containerClassName={styles.pagination}
                pageLinkClassName={styles.pagination__btn}
                activeLinkClassName={styles.active}
            />
        </div>
    )
};


export default Pagination;
