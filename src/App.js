import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Projects from './components/Projects'
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
                    <Route exact path="/projects" component={Projects}/>
                </Switch>
            </Router>
        )
    }
}

export default App;