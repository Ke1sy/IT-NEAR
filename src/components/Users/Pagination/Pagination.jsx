import React from 'react';
import PropTypes from 'prop-types';
import styles from './pagination.module.scss';
import ReactPaginate from 'react-paginate';

const Pagination = ({totalPages, currentPage, onSetCurrentPage}) => {
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

Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onSetCurrentPage: PropTypes.func
};

Pagination.defaultProps = {
    totalPages: 1,
    currentPage: 1,
    onSetCurrentPage: () => {}
};

export default Pagination;
