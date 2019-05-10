import React from 'react'
import Login from './components/Login'
import { Route, NavLink, withRouter } from 'react-router-dom'
import './App.css'
import Jokes from './components/jokes'
import Signup from './components/Signup'

function App () {
  const logout = () => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
  return (
    <div className='App'>
      <div className='container'>
        <div className='navbar'>
          <nav>
            <NavLink to='/'>
      Home
            </NavLink>
            <div />
            <NavLink to='/jokes'>
      Jokes
            </NavLink>
            <NavLink to='/signup'>
      Sign Up
            </NavLink>

            <p onClick={logout}>Logout</p>
          </nav>
        </div>
        <main>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/jokes' component={Jokes} />
        </main>
      </div>
    </div>
  )
}

export default withRouter(App)
