import React from 'react';
import styles from './pagination.module.scss';

const renderPaginationBtns = (page, onSetCurrentPage, totalPages) => {
    const startBtns = [page, page + 1, page + 2];
    const gapBtns = [page - 2, page - 1, page];
    const middleBtns = ['...'];
    const lastBtns = [totalPages - 2, totalPages - 1, totalPages];

    let btnsArr = [];

    if (page < totalPages - 6) {
        btnsArr = [...startBtns, ...middleBtns, ...lastBtns];
    } else if (page < totalPages - 4) {
        btnsArr = [...gapBtns, ...middleBtns, ...lastBtns];
    } else if (page < totalPages - 3) {
        btnsArr = [...gapBtns, ...lastBtns];
    } else {
        btnsArr = [...middleBtns, ...lastBtns];
    }

    return btnsArr.map(num => {
        return num === '...' ? num :
            <button type="button"
                    key={num}
                    onClick={() => onSetCurrentPage(num)}
                    className={
                      num === page ? `${styles.pagination__btn} ${styles.active}` : styles.pagination__btn
                    }
                    data-name={num}>
                {num}
            </button>
    })
};


const Pagination = ({totalPages, currentPage, onSetCurrentPage}) => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages = [...pages, i];
    }

    return (
        <div className={styles.pagination}>
            {renderPaginationBtns(currentPage, onSetCurrentPage, totalPages)}
        </div>
    )
};

export default Pagination;
