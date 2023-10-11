const router = require("express").Router();

const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cyp = require("crypto-js")


router.post("/register", async (req, res)=>{

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cyp.AES.encrypt(req.body.password, "bugz"),
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch(err){
        res.status(500).json(err);
    }
})


router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
  
      if (!user) {
        return res.status(401).json("Wrong Username");
      }
  
      const hash = cyp.AES.decrypt(user.password, "bugz");
      const myPassword = hash.toString(cyp.enc.Utf8);
  
      if (myPassword !== req.body.password) {
        return res.status(401).json("Wrong Password");
      }

      const token = jwt.sign({
        id: user._id, 
        isAdmin: user.isAdmin,
      }, "bugz", {expiresIn: "1d"}
      )
      const { password, ...others } = user._doc;
      res.status(200).json({...others, token}); // Send user data without the password
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error");
      res.send(err);
    }
  });
  
module.exports = router 