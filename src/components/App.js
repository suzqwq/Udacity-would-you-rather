import React, { Component, Fragment } from 'react'
import { handleInitial} from '../actions/shared'
import { connect } from 'react-redux'
import Signin from './Signin'
import NewPoll from './NewPoll'
import Home from './Home'
import Nav from './Nav'
import PrivateRoute from './PrivateRoute'
import Leaderboard from './Leaderboard'
import Question from './Question'
import QuestionPage from './QuestionPage'
import InvalidPage from './InvalidPage'
import { BrowserRouter as Router,
       Switch,
       Route,
        withRouter } from 'react-router-dom'


class App extends Component {

  componentDidMount(){
    this.props.dispatch(handleInitial())
   
  }

  render() {


    return (
      <Router>
        <Fragment>
         <div className="app-container">
           <div className='container'>
            <Nav allUsers={this.props.allUsers} />
           <Switch>
              <PrivateRoute exact path='/leaderboard' component={Leaderboard}  />
              <PrivateRoute exact path='/add' component={NewPoll} />
              <PrivateRoute exact path='/home' component={Home}  />
              <PrivateRoute exact path='/question' component= {QuestionPage} />} />
              <PrivateRoute exact path='/question/:id' component= {Question} />} />
              <Route exact path='/'  component={withRouter(Signin)} />
              <Route exact path='/qustion/invalid' component={InvalidPage} />
          </Switch>
           </div>
         </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({users, authedUser}){
  return {
    allUsers: Object.values(users),
    authed: authedUser==null ? false : true,
 
    
  }
}

export default connect(mapStateToProps)(App)
