const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Hoot = require('../model/hoot.js');
const router = express.Router();

//Public Routes
router.post('/', async (res, req) => {
try {
    req.body.author = req.user._id;
    const hoot = await Hoot.Create(req.body);
    hoot._doc.author = req.user;
    res.statusCode(201).json(hoot);
} catch (error) {
   console.log(error);
   res.statusCode(5001).json(error); 
}
});

router.get('/', async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate('author')
      .sort({ createdAt: 'desc' });
    res.status(200).json(hoots);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:hootId', async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate('author');
    res.status(200).json(hoot);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:hootId/comments', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();
    
    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.delete('/:hootId', async (req, res) => {
    try {
      const hoot = await Hoot.findById(req.params.hootId);
      
      if(!hoot.author.equals(req.user._id)) {
        return res.status(403).send( "You're not allowed to enter. Get out!");
      }

      const deleteHoot = await Hoot.findByidAndDelete(req.params.hootId);
      res.status(200).json(deleteHoot);
    } catch (error) {
       res.status(500).json(error); 
    }
});
  
//Protected Routes
router.use(verifyToken);
router.post('/', async (req, res) => {});

module.exports = router;

