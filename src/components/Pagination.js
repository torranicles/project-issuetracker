import React from 'react';

const Pagination = ({ issuesPerPage, totalIssues, paginate }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className="pagination">
            {
                pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <a onClick={() => paginate(num)} href="#!" className="page-link">
                            {num}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default Pagination;