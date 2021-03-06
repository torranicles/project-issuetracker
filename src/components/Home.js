import React from 'react'
import styles from '../Home.module.css'
import AddIssue from './AddIssue.js'

const Home = (props) => {
    return (
        <div className={styles.bg}>
            <div className={styles.leftPanel} id="left-panel">
                <h1 className={styles.head}>
                    issue tracker
                </h1>
                <form className={`${styles.searchContainer} shadow`} onSubmit={props.handleProjectSearch}>
                    <input type="text"
                        onChange={props.handleSearchChange}
                        placeholder="Project name..."
                        className={`form-control ${styles.searchBar}`}
                    />
                    <input className="btn btn-primary" id={styles.searchBtn} type="submit" value="Search" />
                </form>
                <p className={styles.message}>{props.flashMessage && props.flashMessage.includes('does not exist') ? props.flashMessage : ''}</p>
                <div className={styles.addBtn}>
                    <i className="fas fa-folder-plus mr-2 text-primary" />
                    <span className={styles.btnText} onClick={props.handleViewForm}>Start a new issue</span>
                </div>
                <button onClick={props.handleToggle} type="button" className="btn btn-primary" id={styles.newIssueBtn}>
                    New Issue
                </button>
            </div>
            {
                props.viewForm
                    ? <div className={styles.modal} id="modal-form">
                        <div className={styles.formContainer}>
                            <AddIssue
                                newSubmit={true}
                                flashMessage={props.flashMessage}
                                message={props.message}
                                handleChange={props.handleFormChange}
                                handleSubmit={props.handleSubmit}
                                handleCloseForm={props.handleCloseForm} />
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}

export default Home;