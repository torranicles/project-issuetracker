import React from 'react'
import styles from '../Home.module.css'
import AddIssue from './AddIssue.js'

const Home = (props) => {
    return (
        <div className={styles.bg}>
                <div className="w-50 h-100">
                    <h1 className={styles.head}>
                        issue tracker
                    </h1>
                    <form className={`${styles.searchContainer} shadow`} onSubmit={props.handleProjectSearch}>
                        <input type="text" 
                            onChange={props.handleSearchChange} 
                            placeholder="Project name..."
                            className="form-control"
                            style={{
                                padding: '5%',
                                borderStyle: 'none'
                            }}
                        />
                        <input className="btn btn-primary px-5" type="submit" value="Search"/>
                    </form>
                    <div className={styles.addBtn} onClick={props.handleViewForm}>
                        <i className="fas fa-folder-plus mr-2 text-primary"/><span>Start a new issue</span>
                    </div>
                </div>
                {
                    props.viewForm 
                    ? <div className="d-flex align-items-center justify-content-center w-50 h-100">
                        <div className={styles.formContainer}>
                            <AddIssue 
                                newSubmit={true}
                                message={props.message}
                                handleChange={props.handleFormChange} 
                                handleSubmit={props.handleSubmit} 
                                handleCloseForm={props.handleCloseForm}/>
                        </div>
                    </div>
                    : null
                }
                
            </div>
    )
}

export default Home;