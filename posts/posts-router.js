const express = require('express')
const db = require('../data/db');
const port = 4001;
const router = express.Router();

router.post("/", (req, res) => {
    const postInfo = req.body;
  
    if (!postInfo.title || !postInfo.contents) {
      res.status(400).json({
          success: false,
          errorMessage: "Please provide name and bio for the user."
        });
      }
    db
      .insert(postInfo)
      .then(u => {
          res.status(201).json({
              success: true,
              u
        });
      })
      .catch(error => {
        res.status(500).json({
          success: false,
          errorMessage: "There was an error while saving the user to the database"
        });
      });
  });
  
  router.get('/', async (req, res) => {
    try {
      const posts = await db.find(req.query);
      res.status(200).json(posts);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    }
  });
  

  module.exports = router;






