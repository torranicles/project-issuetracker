import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from '../Home.module.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            search: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(e) {
        this.setState({
            search: e.target.value
        })
        console.log(this.state.search)
    }

    handleSearch() {
        axios.get('/search', {
            params: {
                search: this.state.search
            }
        })
    }
    render() {
        return (
            <div className={styles.bg}>
                <h1 className={styles.head}>
                    issue tracker
                </h1>
                <form className={`${styles.searchContainer} shadow`} onSubmit={this.handleSearch}>
                    <input type="text" 
                        onChange={this.handleChange} 
                        placeholder="Enter project name..."
                        className="form-control"
                        style={{
                            padding: '5%',
                            borderStyle: 'none'
                        }}
                    />
                    <input className="btn btn-primary px-5" type="submit" value="Search"/>
                </form>
                <Link to="/projects">Test</Link>
            </div>
        )
    }
}

export default Home;