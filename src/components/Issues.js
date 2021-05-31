import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import styles from '../Issues.module.css'
import { useParams } from 'react-router-dom'
import AddOrEdit from './AddIssue'
import IssueCard from './IssueCard'
import Pagination from './Pagination'
import PulseLoader from 'react-spinners/PulseLoader'

const Issues = () => {
    let params = useParams();
    const [loading, setLoading] = useState(false)
    const [issues, setIssues] = useState([]);
    const [issueCount, setIssueCount] = useState({
        all: 0,
        open: 0,
        closed: 0
    });
    const [formData, setFormData] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [message, setMessage] = useState('');
    const [isSearched, setIsSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [issuesPerPage] = useState(12);
    
    const lastIssueIndex = currentPage * issuesPerPage;
    const firstIssueIndex = lastIssueIndex - issuesPerPage;
    const currentIssues = issues.slice(firstIssueIndex, lastIssueIndex);

    const getIssues = useCallback((bool) => {
        axios.get(`/api/issues/${params.project}`)
            .then(res => {
                let openCount = 0;
                let closedCount = 0;
                if (!isSearched || bool) {
                    setIssues(res.data);
                    setLoading(false);
                }

                //Set issue counts
                if (res.data.length && res.data[0].hasOwnProperty('issue_title')) { 
                    res.data.map(elem => {
                        if (elem.open) {
                            return openCount = openCount + 1;
                        } else {
                            return closedCount = closedCount + 1;
                        }
                    })
                    setIssueCount({
                        all: res.data.length,
                        open: openCount,
                        closed: closedCount
                    })
                } else {
                    setIssueCount({
                        all: 0,
                        open: 0,
                        closed: 0
                    })
                }
            })
            .catch(err => console.log(err))
    }, [params.project]); //getIssues() does not need to run every time isSearched changes
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setLoading(true);
        getIssues();
    }, [getIssues]); 
    
    const handleChange = (e) => {
        setFormData((prevProps) => ({
          ...prevProps,
          [e.target.name]: e.target.value
        }));
    };

    const searchIssue = () => {
        axios.get('/search', {
            params: {
                project: params.project,
                issue_title: formData.issue_title
            }
        })
        .then(res => {
            if (res.data.length) {
                setCurrentPage(1);
                setIssues(res.data);
                setIsSearched(true);
                setLoading(false);
                document.getElementById('search-form').reset();
            } else if (res.data.length === 0) { 
                setIssues([]);
                setIsSearched(false);
                setLoading(false);
            } else if (res.data.length === 0 && isSearched) {
                setIsSearched(false);
                getIssues(true);
            } 
        })
        .catch(err => console.log(err))
    }

    const handleIssueSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        searchIssue();
    }

    const handleNewClick = (e) => {
        setEditForm(false);
        document.getElementById('form').reset();
    }
    
    const handleNewSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/issues/${params.project}`, {
            ...formData,
            confirm: true, //To bypass confirm submit message
            project: params.project //Auto filled with the current project on
        })
        .then(res => {
            if (res.data === "New issue added!") {
                getIssues();
                setMessage(res.data);
                setTimeout(() => {
                    setMessage('');
                }, 2500);
            } else {
                setMessage(res.data[0])
            }
        })
        .catch(err => console.log(err))
    }

    const handleEditClick = (e) => {
        setEditForm(true);
        axios.get(`/api/issues/${params.project}`, {
            params: {
                id: e.target.id
            }
        })
        .then(res => {
            if (res.data.open === false) {
                return null;
            } else {
                setFormData({
                    ...res.data[0],
                    id: e.target.id
                });
            }
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/issues/${params.project}`, {
            ...formData,
            project: params.project
        }, {
            params: {
                id: formData.id
            }
        })
        .then(res => {
            if (res.data === "Issue successfully edited.") {
                if (isSearched) {
                    searchIssue();
                } else {
                    getIssues();
                }
                setMessage(res.data);
                setTimeout(() => {
                    setMessage('');
                }, 2500);
            } else {
                setMessage(res.data);
                setTimeout(() => {
                    setMessage('');
                }, 2500);
            }
        })
        .catch(err => console.log(err))
    }

    const confirmDelete = () => {
        document.getElementById('confirm-delete')
            .classList.remove('d-none');
    }

    const cancelDelete= () => {
        document.getElementById('confirm-delete')
        .classList.add('d-none');
    }

    const handleDelete = (e) => {
        axios.delete(`/api/issues/${params.project}`, {
            params: {
                id: e.target.id,
                project: params.project
            }
        })
        .then(res => {
            if (res.data === "All issues deleted.") {
                getIssues();
                setIssueCount({
                    all: 0,
                    open: 0,
                    closed: 0
                })
            } else {
                if (isSearched) {
                    searchIssue();
                    getIssues()
                } else {
                    getIssues();
                }
            }
            document.getElementById('confirm-delete').classList.add('d-none');
            setMessage(res.data);
            setTimeout(() => {
                setMessage('');
            }, 2500);
        })
        .catch(err => console.log(err))
    }
    
    const handleClose = (e) => {
        axios.put(`/api/issues/${params.project}`, {
                open: 'false'
            }, {
                params: {
                    id: e.target.id
                }
            })
            .then(res => {
                if (isSearched) {
                    searchIssue();
                } else {
                    axios.get(`/api/issues/${params.project}`)
                    .then(res => {
                        setIssues(res.data)
                    })
                    .catch(err => console.log(err))
                }
                setIssueCount({
                    all: issueCount.all,
                    open: issueCount.open - 1,
                    closed: issueCount.closed + 1
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const handleSortIssue = (e) => {
        setIsSearched(false);
        setLoading(true);
        axios.get(`/api/issues/${params.project}`, {
            params: {
                open: e.target.id
            }
        })
        .then(res => {
            if (res.data) {
                setCurrentPage(1);
                setIssues(res.data);
                setLoading(false);
            } 
        })
        .catch(err => console.log(err))
    }   
    
    let { issue_title, issue_text, created_by, assigned_to, status_text } = formData;
    return (
        <div>
            {/* Nav */}
            <nav className={`${styles.navigation} navbar navbar-expand-md navbar-dark`}>
                <a className={`navbar-brand ${styles.title}`} href="/">Project Issue Tracker</a>
                <div className={`navbar-nav ${styles.searchBar}`}>
                    <form className="d-flex" id="search-form" onSubmit={handleIssueSearch}>
                        <input type="text" 
                            onChange={handleChange}
                            name="issue_title" 
                            placeholder="Search"
                            className="form-control"
                        />
                        <button className="btn" type="submit"> 
                            <i className="fas fa-search text-light"/>
                        </button>
                    </form>
                </div>
            </nav>
            {/* Toolbar */}
            <div className={styles.toolbar}> 
                {/* For 768px viewport and lower only */}
                <div className={`${styles.dropdown} dropdown`}>
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                        Sort
                        <span className="caret"/>
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={handleSortIssue}>({issueCount ? issueCount.all : "0"}) All issues</li>
                        <li onClick={handleSortIssue} id="true">({issueCount ? issueCount.open : "0"}) Open</li>
                        <li onClick={handleSortIssue} id="false">({issueCount ? issueCount.closed : "0"}) Closed</li>
                    </ul>
                </div>
                <div className={styles.sortBox}>
                    <span className="mr-2">Sort: </span>
                    <span className={`${styles.issueCount} bg-dark`} onClick={handleSortIssue}>
                        {
                            issueCount
                            ? issueCount.all
                            : "0"
                        }
                    </span>
                    <span className="mr-2">All issues</span>
                    <span className={`${styles.issueCount} bg-success`} onClick={handleSortIssue} id="true">
                        {
                            issueCount
                            ? issueCount.open
                            : "0"
                        }
                    </span>
                    <span className="mr-2">Open</span>
                    <span className={`${styles.issueCount} bg-danger`} onClick={handleSortIssue} id="false">
                        {
                            issueCount
                            ? issueCount.closed
                            : "0"
                        }
                    </span>
                    <span className="mr-2">Closed</span>
                </div>
                <div className={styles.messageBox}>
                    <div className={`d-none ${styles.confirmDelete}`} id="confirm-delete">
                        <button className="btn btn-outline-danger mx-3" onClick={handleDelete}>Confirm</button>
                        <button onClick={cancelDelete} className="btn btn-link text-dark">Cancel</button>
                    </div>
                    <span className="text-danger mr-3">
                        {
                            message.includes("deleted") || message.includes("No issues found")
                            ? message
                            : null
                        }
                    </span>
                    <i 
                        className={`${styles.addBtn} fas fa-plus-square mr-3`} 
                        data-toggle="modal" 
                        data-target="#AddOrEdit" 
                        onClick={handleNewClick}
                    />
                    <button className="btn btn-danger" onClick={confirmDelete}>Delete all</button>
                </div>
            </div>
            {/* Issues */}
            <div className={styles.issuesContainer}>
                {
                    loading 
                    ?   <div className="d-flex align-items-center justify-content-center" style={{height: '50vh'}}>
                            <PulseLoader color={'white'}/>
                        </div>
                    : issues.length 
                    ?   <IssueCard 
                            issues={currentIssues} 
                            handleEditClick={handleEditClick} 
                            handleDelete={handleDelete}
                            handleClose={handleClose}
                        />
                    :   <div className="d-flex align-items-center justify-content-center text-center" style={{height: '50vh'}}>
                            No issues found. 
                        </div>
                }
            </div>
            <div className={styles.pagination}>
                <Pagination issuesPerPage={issuesPerPage} totalIssues={issues.length} paginate={paginate}/>
            </div>
            {/* Modal for add/edit */}
            <div className="modal fade" id="AddOrEdit">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <AddOrEdit 
                                editForm={editForm}
                                handleChange={handleChange} 
                                handleSubmit={
                                    editForm
                                    ? handleEditSubmit
                                    : handleNewSubmit
                                } 
                                message={message}
                                title={issue_title}
                                description={issue_text}
                                created_by={created_by}
                                assigned_to={assigned_to}
                                status={status_text}
                                />
                        </div>
                        <div className="p-3">
                            <span className="float-left text-success">
                                {message && !message.includes('deleted') && !message.includes("No issues found") ? message : null}
                            </span>
                            <button type="button" className="btn btn-outline-secondary float-right" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Issues;