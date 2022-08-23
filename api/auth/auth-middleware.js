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

function checkUsernameExists(req, res, next) {
  Users.findBy({"username": req.body.username}).first()
  .then((result) => {
    if(result == null) {
      res.status(401).json({ message: 'Invalid Credentials'});
      return;
    }
    next()
  })
}

function checkPasswordLength(req, res, next) {
  if(req.body.password == null || req.body.password.length <= 3) {
    res.status(422).json({message: "Password must be longer than 3 chars"})
    return
  }
  req.user = {username: req.body.username, password: req.body.password}
  next()
}



module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}