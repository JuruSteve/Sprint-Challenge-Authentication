import React, { Component } from 'react'
import axios from 'axios'
import requireAuth from '../auth/requireAuth'
import './styles.css'

class Jokes extends Component {
    state = {
        jokes: []
    }
  componentDidMount() {
    axios.get('http://localhost:3300/api/jokes')
        .then(res=>{
            this.setState({jokes: res.data})
        })
  }
  
    render () {
        const {jokes} = this.state
    return (
      <div className="jokes">
        <ul className="jokes-list">
            {
            jokes && jokes.length > 0
                 &&
            jokes.map((joke)=>(
                <li key={joke.id}>{joke.joke}</li>
            ))
        }
        {jokes.length < 1 && 'Loading ...'}
        </ul>
      </div>
    )
  }
}

export default requireAuth(Jokes)
