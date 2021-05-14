import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../Issues.module.css'
import { useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import AddOrEdit from './AddIssue'

const Issues = (props) => {
    let params = useParams();
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
    
    const getIssues = (bool) => {
        axios.get(`/api/issues/${params.project}`)
            .then(res => {
                let openCount = 0;
                let closedCount = 0;
                if (!isSearched || bool) {
                    setIssues(res.data);
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
                } 
            })
            .catch(err => console.log(err))
    }

    useEffect(getIssues, [isSearched, params.project]);

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
                setIssues(res.data);
                setIsSearched(true);
                document.getElementById('search-form').reset();
            } else {
                if (!isSearched) {
                    setMessage('No issue found.');
                    setTimeout(() => {
                        setMessage('');
                    }, 2500);
                } else if (res.data.length === 0 && isSearched) { //If a single searched item is deleted
                    setIsSearched(false);
                    getIssues(true);
                } else {
                    getIssues();
                }
            }
        })
        .catch(err => console.log(err))
    }

    const handleIssueSearch = (e) => {
        e.preventDefault();
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
                document.getElementById('form').reset();
            } else {
                setMessage(res.data[0])
            }
            console.log(res.data)
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
                document.getElementById('form').reset();
            } else {
                setMessage(res.data);
                setTimeout(() => {
                    setMessage('');
                }, 2500);
            }
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (e) => {
        console.log(e.target.id)
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
                } else {
                    getIssues();
                }
            }
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
        axios.get(`/api/issues/${params.project}`, {
            params: {
                open: e.target.id
            }
        })
        .then(res => {
            if (res.data) {
                setIssues(res.data)
            } 
        })
        .catch(err => console.log(err))
    }   
    
    let { issue_title, issue_text, created_by, assigned_to, status_text } = formData;
    return (
        <div>
            {/* Nav */}
            <nav className={`${styles.navigation} navbar navbar-expand-md navbar-dark`}>
                <a className="navbar-brand" href="/">Project Issue Tracker</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav d-flex justify-content-end w-100">
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
                <div className="w-50 h-100 d-flex align-items-center">
                    <span className={`${styles.issueCount} bg-dark`} onClick={handleSortIssue}>
                        {
                            issueCount
                            ? issueCount.all
                            : "0"
                        }
                    </span>
                    <span className="mr-3">All issues</span>
                    <span className={`${styles.issueCount} bg-success`} onClick={handleSortIssue} id="true">
                        {
                            issueCount
                            ? issueCount.open
                            : "0"
                        }
                    </span>
                    <span className="mr-3">Open</span>
                    <span className={`${styles.issueCount} bg-danger`} onClick={handleSortIssue} id="false">
                        {
                            issueCount
                            ? issueCount.closed
                            : "0"
                        }
                    </span>
                    <span className="mr-3">Closed</span>
                </div>
                <div className="w-50 h-100 d-flex justify-content-end align-items-center">
                    <span className="text-danger mr-3">
                        {
                            message.includes("Issue deleted") || message.includes("No issue found")
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
                    <button className="btn btn-danger" onClick={handleDelete}>Delete all</button>
                </div>
            </div>
            {/* Issues */}
            <div className={styles.issuesContainer}>
                {
                    issues.length
                    ? issues.map(el => {
                        return  <div className={`col-sm-3 float-left px-4 mb-5`}>
                                    <div className={`${styles.issueCard} card`}>
                                        <div className="card-header p-0">
                                            <div className={styles.titleContainer}>
                                                <i  className="fas fa-circle float-right pt-2"
                                                    style={{
                                                        fontSize: '.75rem',
                                                        color:  el.open
                                                                ? 'rgb(40,167,69)' //Green if open/true
                                                                : 'rgb(220,53,69)' //Red if closed/false
                                                    }}/>
                                                <h1 className={styles.title}>
                                                    {el.issue_title}
                                                </h1>
                                                <div className="float-right">
                                                    <i className="far fa-edit mr-2 text-primary"
                                                        data-tip="Edit" 
                                                        data-for="edit"
                                                        data-toggle={
                                                            el.open
                                                            ? "modal"
                                                            : null
                                                        }
                                                        data-target="#AddOrEdit" 
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        id={el._id}
                                                        onClick={
                                                            el.open
                                                            ? handleEditClick
                                                            : null}/>
                                                    <ReactTooltip place="bottom" effect="solid" id="edit"/>
                                                    <i className="far fa-trash-alt mr-2 text-danger" 
                                                        data-tip="Delete" 
                                                        data-for="delete"
                                                        id={el._id}
                                                        onClick={handleDelete}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}/>
                                                    <ReactTooltip place="bottom" effect="solid" id="delete"/>
                                                    <i className="far fa-times-circle text-success" 
                                                        onClick={handleClose} 
                                                        data-tip="Close" 
                                                        data-for="close"
                                                        id={el._id}
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}/>
                                                    <ReactTooltip place="bottom" effect="solid" id="close"/>
                                                </div>
                                                <span style={{
                                                    color: "lightgray"
                                                }}>
                                                    {
                                                        el.created_on !== el.updated_on
                                                        ? `Updated ${new Date(el.updated_on).toLocaleDateString()}`
                                                        : `Created ${new Date(el.created_on).toLocaleDateString()}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-body w-100 h-100 p-0">
                                            <div className={styles.textContainer}>
                                                {el.issue_text}
                                            </div>
                                            <div className={styles.status}>
                                                <b>Status:</b> {el.status_text}
                                            </div>
                                        </div>
                                        <div className={`${styles.persons} py-2 card-footer bg-white`}>
                                            <span id="created_by">
                                                Created by {el.created_by}
                                            </span>
                                            <br/>
                                            <span>
                                                Assigned to {el.assigned_to}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        
                    })
                    : null
                }
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
                                {props.successMessage}
                            </span>
                            <span className="float-left text-danger">
                                {props.failureMessage}
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