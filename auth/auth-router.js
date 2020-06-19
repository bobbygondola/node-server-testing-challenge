const router = require("express").Router();
const db = require("../faculty/faculty-helpers");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//////////////////////////////////////////////////WORKING
router.post('/register', (req,res) => {
    const { username, password, department } = req.body;
    //hash
    const rounds = 8;
    const hash = bcrypt.hashSync(password, rounds)
    //function
    db.addUser({username, password:hash, department})
    .then(user => {
        res.status(201).json(user)
    })
})


//////////////////////////////////////////////////WORKING
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (req.body) {
    db.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        console.log("USERRRR", user);
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user);
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}.. Welcome to my server.. Here is a token that we made with JWT`,
           token,
           session: req.session, });
           
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});
//////////////////////////////////////////////////WORKING
function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const secret = process.env.JWT_SECRET || 'secret baby'
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}

/////////////////////////

router.delete('/logout', (req,res) => {
    if (req.session){
        console.log("this is the session log",req.session)
        req.session.destroy(error => {
            if(error){
                res.status(500).json({message: "cant log out"});
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(204).end();
    }
})


module.exports=router;