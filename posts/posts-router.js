const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.post("/", (req, res) => {
  const postInfo = req.body;

  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      success: false,
      errorMessage: "Please provide title and contents for the user."
    });
  }
  db.insert(postInfo)
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

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({
        message: "error deleting"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: "error updating"
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(u => {
      if (u) {
        res.status(200).json({ success: true, u });
      } else {
        res
          .status(404)
          .json({ success: false, message: "could not find that id" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ success: false, message });
    });
});

module.exports = router;
