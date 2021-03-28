import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'

class App extends React.Component {
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
            <div>
                <h1 className="head">
                    issue tracker
                </h1>
                <form className="search-container shadow" >
                    <input type="text" 
                        onChange={this.handleChange} 
                        placeholder="Enter project name..."
                        className="form-control"
                        style={{
                            padding: '5%',
                            borderStyle: 'none'
                        }}
                    />
                    <input className="btn btn-primary px-5" type="submit" onSubmit={this.handleSearch} value="Search"/>
                </form>
            </div>
        )
    }
}

export default App;