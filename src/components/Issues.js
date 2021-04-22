import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../Issues.module.css'
import { useParams } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'


const Issues = (props) => {
    let params = useParams();
    const [issues, setIssues] = useState([]) ;
    const [issueCount, setIssueCount] = useState({
        open: 0,
        closed: 0
    })

    useEffect(() => {
        axios.get(`/api/issues/${params.project}`)
            .then(res => {
                let openCount = 0;
                let closedCount = 0;
                setIssues(res.data);

                //Set issue counts
                if (res.data.length) { 
                    res.data.map(elem => {
                        if (elem.open) {
                            openCount = openCount + 1;
                        } else {
                            closedCount = closedCount + 1;
                        }
                    })
                    setIssueCount({
                        open: openCount,
                        close: closedCount
                    })
                }
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div>
            <nav className={`${styles.navigation} navbar navbar-expand-md navbar-dark`}>
                <a className="navbar-brand" href="/">Project Issue Tracker</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav d-flex justify-content-end w-100">
                        <li className="nav-item mr-5">
                            <a className="nav-link text-light" href="/projects/#">New Project</a>
                        </li>
                        <li className="nav-item">
                            <form className="d-flex" onSubmit={props.handleSearch}>
                                <input type="text" 
                                    onChange={props.handleFormChange} 
                                    placeholder="Search"
                                    className="form-control"
                                />
                                <button className="btn" type="submit"> 
                                    <i className="fas fa-search text-light"/>
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>  
            </nav>
            <div className={styles.toolbar}>
                <div className="w-50 h-100 d-flex align-items-center">
                <div className="dropdown">
                    <button type="button" className="btn btn-secondary mr-3 dropdown-toggle" data-toggle="dropdown">
                        Sort by
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="/#">Date created</a>
                        <a className="dropdown-item" href="/#">Date updated</a>
                    </div>
                </div>
                <span className={`${styles.issueCount} bg-dark`}>
                    {
                        issues.length
                        ? issues.length
                        : "0"
                    }
                </span>
                <span className="mr-3">All issues</span>
                <span className={`${styles.issueCount} bg-success`}>
                    {
                        issues.length
                        ? issueCount.open
                        : "0"
                    }
                </span>
                <span className="mr-3">Open</span>
                <span className={`${styles.issueCount} bg-danger`}>
                {
                        issues.length
                        ? issueCount.close
                        : "0"
                    }
                </span>
                <span className="mr-3">Closed</span>
                </div>
                <div className="w-50 h-100 d-flex justify-content-end align-items-center">
                    <i className={`${styles.addBtn} fas fa-plus-square mr-3`}/>
                    <button className="btn btn-danger">Delete all</button>
                </div>
            </div>
            <div className={styles.issuesContainer}>
                {
                    issues.length
                    ? issues.map(el => {
                        return  <div className="col-sm-3 float-left px-4 mb-5">
                                    <div className={`${styles.issueCard} card`}>
                                        <div className={styles.titleContainer}>
                                            <i  className="fas fa-circle float-right pt-3"
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
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}/>
                                                <ReactTooltip place="bottom" effect="solid" id="edit"/>
                                                <i className="far fa-trash-alt mr-2 text-danger" 
                                                    data-tip="Delete" 
                                                    data-for="delete"
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}/>
                                                <ReactTooltip place="bottom" effect="solid" id="delete"/>
                                                <i className="far fa-times-circle text-success" 
                                                    data-tip="Close" 
                                                    data-for="close"
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
                                        <div className="card-body w-100 h-100 p-0">
                                            <div className={styles.textContainer}>
                                                {el.issue_text}
                                            </div>
                                            <div className={styles.status}>
                                                <b>Status:</b> {el.status_text}
                                            </div>
                                        </div>
                                        <div className={`${styles.persons} py-2 card-footer bg-white`}>
                                            <span>
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
        </div>
    )
}

export default Issues;