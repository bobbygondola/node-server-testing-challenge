const router = require("express").Router();
const db = require("../faculty/faculty-helpers");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


//////////////////////////////////////////////////
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line
 
        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username,
    // ...otherData
  };

  const secret = {
      secret: "secret"
  };

  const options = {
    expiresIn: '1d', // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secret, options); // this method is synchronous
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