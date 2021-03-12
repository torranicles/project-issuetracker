import React from 'react'
import Login from './Login'
import Register from './Register'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //move to App.js
            viewReg: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleSuccessAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push('/dashboard');
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            viewReg: !this.state.viewReg
        })
    }

    componentDidMount() {
        if (this.props.logged_in) {
            this.props.history.push('/dashboard')
        }
    }
    
    handleLogin() {
        document.getElementById('head-container')
            .classList.add('d-none');
        document.getElementById('form-container')
            .classList.remove('hidden-container');
        document.getElementById('login-btn')
            .classList.add('d-none')
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex h-100 p-3 align-items-center flex-column">
                    <div className="container-md" id="head-container">
                        <h1 className="head">
                        Track your project issues
                        </h1>
                    </div>
                    <div className="w-100" id="form-container">
                        {
                            !this.state.viewReg
                            ? <Login handleClick={this.handleClick} handleSuccessAuth={this.handleSuccessAuth}/>
                            : <Register handleClick={this.handleClick} handleSuccessAuth={this.handleSuccessAuth}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
