import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Issues from './components/Issues'
import Home from './components/Home'

class App extends React.Component {
  constructor(props) {
      super(props);
    }
    render() {
        
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={props => {
                            return <Home 
                                {...props}
                            />} 
                        }/>
                    <Route exact path="/projects-issues" component={Issues}/>
                </Switch>
            </Router>
        )
    }
}

export default App;