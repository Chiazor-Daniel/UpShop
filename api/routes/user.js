const router = require("express").Router();
const User = require("../models/User");
const { verify, Authorize, AdminMe } = require("./verifyToken");
const cyp = require("crypto-js");

router.put("/:id", Authorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = cyp.AES.encrypt(req.body.password, "bugz");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message); // Return the error message for debugging
  }
});

//Delete
router.delete("/find/:id", AdminMe, async (req, res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({user, delete: "deleted"})
    }catch(err){
        res.status(500).json(err.message)
    }
})

router.get("/:id",Authorize, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);

        const {password, ...others} = user._doc;
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err.message)
    }
})


router.get("/", AdminMe, async(req, res)=>{
    const query = req.query.new
    try{
        const users = query ? await User.find().sort({id: -1}).limit(5) : await User.find();
        res.status(200).json(users)
    } catch(err){
        res.status(500).json(err.message)
    }
})

router.get("/stats", AdminMe, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
