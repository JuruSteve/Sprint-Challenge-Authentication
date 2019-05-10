import React from 'react'
import Login from './components/Login'
import { Route, NavLink, withRouter } from 'react-router-dom'
import './App.css'
import Jokes from './components/jokes'

function App () {
  const logout = () => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  return (
    <div className='App'>
      <div>
        <nav>
          <NavLink to='/'>
      Home
          </NavLink>
          <div />
          <NavLink to='/jokes'>
      Jokes
          </NavLink>
          <button onClick={logout}>Logout</button>
        </nav>
      </div>
      <Route exact path='/' component={Login} />
      <Route exact path='/jokes' component={Jokes} />
    </div>
  )
}

export default withRouter(App)
