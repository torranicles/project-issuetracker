import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          logged_in: false,
          loading: true
      }
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogin(data) {
        this.setState({
            username: data.username,
            logged_in: true
        })
    }

    handleLogout() {
        axios.get('/logout')
            .then(res => {
                if (res.data === "Logged out") {
                    this.setState({
                        logged_in: false
                    })
                }
            })
            .catch(err => {
                console.log("Logout error", err)
            })
    }
    
    checkLoginStatus() {
        axios.get('/logged_in')
            .then(res => {
                if (res.data.logged_in && !this.state.logged_in) {
                    this.setState({
                        logged_in: true,
                        loading: false
                    });
                } else if (!res.data.logged_in) {
                    this.setState({
                        logged_in: false,
                        loading: false
                    });
                }
            })
            .catch(err => console.log("Login status", err)) 
    }

    componentDidMount(){
        this.checkLoginStatus()
    }
    render() {
        return (
            <Router>
                <Switch>
                    {
                        <Route exact path="/" render={props => {
                            return <Home 
                                {...props}
                                logged_in={this.state.logged_in}
                                handleLogin={this.handleLogin}
                            />} 
                        }/>
                    }
                    </Switch>
            </Router>
        )
    }
}

export default App;