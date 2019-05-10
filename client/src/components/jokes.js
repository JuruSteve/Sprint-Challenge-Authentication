import React, { Component } from 'react'
import axios from 'axios'
import requireAuth from '../auth/requireAuth'

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
      <div>
        <ul>
            {
            jokes
                 ? 
            jokes.map((joke)=>(
                <li key={joke.id}>{joke.joke}</li>
            ))
            :
            'No jokes available'
        }
        </ul>
      </div>
    )
  }
}

export default requireAuth(Jokes)
