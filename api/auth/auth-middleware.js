const Users = require("../users/users-model")

function restricted(req, res, next) {
  if(req.session.user == null) {
    res.status(401).json({message: "You shall not pass!"})
  }
  next()
}

function checkUsernameFree(req, res, next) {
  Users.findBy({username: req.body.username}).first() 
    .then((result) => {
      if(result != null) {
          res.status(422).json({ message: 'Username taken'});
          return;
      }
      next()
    })
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