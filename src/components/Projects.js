import React from 'react';
import styles from '../Projects.module.css'

class Projects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className={`${styles.navigation} navbar navbar-expand-md navbar-dark`}>
                    <a className="navbar-brand" href="/projects/#project-issue-tracker">Project Issue Tracker</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav d-flex justify-content-end w-100">
                            <li className="nav-item mr-5">
                                <a className="nav-link text-light" href="/projects/#">Add issue</a>
                            </li>
                            <li className="nav-item">
                                <form className="d-flex" onSubmit={this.handleSearch}>
                                    <input type="text" 
                                        onChange={this.handleChange} 
                                        placeholder="Search"
                                        className="form-control"
                                    />
                                    <button className="btn" type="submit"><i class="fas fa-search text-light"></i></button>
                                </form>
                            </li>
                        </ul>
                    </div>  
                </nav>
                <div className={styles.toolbar}>
                    <div class="dropdown">
                        <button type="button" class="btn btn-secondary mr-3 dropdown-toggle" data-toggle="dropdown">
                            Sort by
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="/#">Date created</a>
                            <a class="dropdown-item" href="/#">Date updated</a>
                        </div>
                    </div>
                    <span className={`${styles.issueCount} bg-dark`}>0</span>
                    <span className="mr-3">All issues</span>
                    <span className={`${styles.issueCount} bg-success`}>0</span>
                    <span className="mr-3">Open</span>
                    <span className={`${styles.issueCount} bg-danger`}>0</span>
                    <span className="mr-3">Closed</span>
                </div>
            </div>
        )
    }
}

export default Projects;