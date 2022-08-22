// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
} = require("./auth-middleware")

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

//POST -> REGISTER USER
router.post("/register", checkPasswordLength, (req, res) => {
  const {username, password} = req.body
  const hash = bcrypt.hashSync(password, 12)
  const user = {username: username, password: hash}
  Users.add(user)
    .then((result) => {
      res.status(200).json({username: username, user_id: result.user_id})
    })
    .catch((err) => {
      console.log(err)
    })
})


//POST -> LOGIN USER
router.post("/login", (req, res) => {
  const {username, password} = req.body
  Users.findBy({username}).first()
    .then((result) => {
      console.log(result)
      if (bcrypt.compareSync(password, result.password)) {
        console.log(username)
        req.session.user = result
        res.status(200).json({message: `Welcome ${username}`})
      } else {
        res.status(401).json({message: "Invalid credentials"})
        return
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
  module.exports = router

