import React from 'react'
import axios from 'axios'
import styles from '../Home.module.css'
import AddIssue from './AddIssue.js'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            search: '',
            message: '',
            viewForm: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleViewForm = this.handleViewForm.bind(this);
    }
    handleViewForm() {
        this.setState({
            viewForm: !this.state.viewForm
        })
    }

    handleChange(e) {
        this.setState({
            search: e.target.value
        })
        console.log(this.state.search)
    }

    handleSearch(e) {
        e.preventDefault();
        axios.get('/search', {
            params: {
                project: this.state.search
            }
        })
        .then(res => {
            if (res.data.length < 1) {
                this.setState({
                    message: 'Project name does not exist.'
                })
            } else {
                this.props.history.push('/projects-issues')
            }
        })
    }
    render() {
        return (
            <div className={styles.bg}>
                <div className="w-50 h-100">
                    <h1 className={styles.head}>
                        issue tracker
                    </h1>
                    <form className={`${styles.searchContainer} shadow`} onSubmit={this.handleSearch}>
                        <input type="text" 
                            onChange={this.handleChange} 
                            placeholder="Project name..."
                            className="form-control"
                            style={{
                                padding: '5%',
                                borderStyle: 'none'
                            }}
                        />
                        <input className="btn btn-primary px-5" type="submit" value="Search"/>
                    </form>
                    <div className={styles.addBtn} onClick={this.handleViewForm}>
                        <i className="fas fa-folder-plus mr-2 text-primary"/><span>Start a new issue</span>
                    </div>
                </div>
                {
                    this.state.viewForm 
                    ? <div className="d-flex align-items-center justify-content-center w-50 h-100">
                        <div className={styles.formContainer}>
                            <AddIssue/>
                        </div>
                    </div>
                    : null
                }
                
            </div>
        )
    }
}

export default Home;