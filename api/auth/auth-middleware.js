const Users = require("../users/users-model")
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
function checkUsernameFree(req, res, next) {

}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists(req, res, next) {
  // if(!req.session.user) {
  //   res.status(401).json({message: "Invalid credentials"})
  // }
  // next()

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  if(req.body.password == null || req.body.password.length <= 3) {
    res.status(422).json({message: "Password must be longer than 3 chars"})
    return
  }
  req.checkedPasswordLength = {password: req.body.password}
  next()
}


module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}