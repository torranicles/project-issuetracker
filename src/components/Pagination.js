import React from 'react';

const Pagination = ({ issuesPerPage, totalIssues, paginate }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
        pageNumbers.push(i)
    }

    let buttons = document.querySelectorAll('.page-item');
    
    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            })
        })
    }

    return (
        <ul className="pagination">
            {
                pageNumbers.map(num => (
                    <li key={num} className={`page-item ${num === 1 ? 'active' : ''}`}>
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