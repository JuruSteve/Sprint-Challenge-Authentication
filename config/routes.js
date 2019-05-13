const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authenticate } = require('../auth/authenticate')
const Users = require('../models/users-model')
const secrets = require('./secrets')

module.exports = server => {
  server.post('/api/register', register)
  server.post('/api/login', login)
  server.get('/api/jokes', authenticate, getJokes)
}

async function register (req, res) {
  // implement user registration
  try {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    const users = await Users.addUser(user)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

async function login (req, res) {
  // implement user login
  try {
    let { username, password } = req.body
    const user = await Users.findBy({ username }).first()
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user)
      res.status(200).json({ message: `Welcome ${user.username}`, token })
    } else {
      res.status(401).json({ message: `You shall not pass!` })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

function getJokes (req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  }

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err })
    })
}

function generateToken (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}
