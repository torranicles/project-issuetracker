import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Issues from './components/Issues'
import Home from './components/Home'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: false,
            search: '',
            message: '',
            viewForm: false
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProjectSearch = this.handleProjectSearch.bind(this);
        this.handleViewForm = this.handleViewForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
    }
    handleViewForm() {
        this.setState({
            viewForm: true
        })
    }

    handleCloseForm() {
        this.setState({
            viewForm: false
        })
    }

    handleSearchChange(e) {
        this.setState({
            search: e.target.value
        })
    }

    handleProjectSearch(e) {
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
                console.log(res);
                this.props.history.push(`/projects-issues/${this.state.search}`);
            }
        })
    }

    handleFormChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/issues/add', this.state)
            .then(res => {
                if (res.data.includes('exists.')) {
                    this.setState({
                        message: res.data,
                        confirm: true //Used on second click/confirm
                    })
                    console.log(res)
                } else if (res.data[0].includes('Issue title')) {
                    this.setState({
                        message: res.data
                    })
                } else {
                    console.log(res)
                    this.setState({
                        confirm: false, //Set to initial state
                        message: ''
                    })
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Switch>
                <Route 
                    exact 
                    path="/" 
                    render={props => {
                        return <Home 
                            {...props} 
                            handleProjectSearch={this.handleProjectSearch}
                            handleSearchChange={this.handleSearchChange}
                            handleViewForm={this.handleViewForm}
                            handleCloseForm={this.handleCloseForm}
                            handleFormChange={this.handleFormChange}
                            handleSubmit={this.handleSubmit}
                            viewForm={this.state.viewForm}
                            message={this.state.message}
                        />} 
                    }/>
                <Route 
                exact 
                    path="/projects-issues/:project" 
                    render={props => {
                        return <Issues 
                            {...props}
                            project={this.state.search}
                            handleFormChange={this.handleFormChange}
                        />
                    }}/>
            </Switch>
        )
    }
}

export default withRouter(App);