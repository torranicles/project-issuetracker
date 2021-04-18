import React from 'react';
import styles from '../Issues.module.css'


const Issues = (props) => {
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
                    <span className={`${styles.issueCount} bg-dark`}>0</span>
                    <span className="mr-3">All issues</span>
                    <span className={`${styles.issueCount} bg-success`}>0</span>
                    <span className="mr-3">Open</span>
                    <span className={`${styles.issueCount} bg-danger`}>0</span>
                    <span className="mr-3">Closed</span>
                    </div>
                    <div className="w-50 h-100 d-flex justify-content-end align-items-center">
                        <i className={`${styles.addBtn} fas fa-plus-square mr-3`}/>
                        <button className="btn btn-danger">Delete all</button>
                    </div>
                </div>
            </div>
    )
}

export default Issues;