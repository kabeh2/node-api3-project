const debug = require("debug")("app:dev");
const validateUser = require("../middleware/validateUser");
const validatePost = require("../middleware/validatePost");
const validateUserId = require("../middleware/validateUserId");
const db = require("../users/userDb");
const postDb = require("./postDb");
const express = require("express");

const router = express.Router();

router.post("/", validatePost, (req, res) => {
  // do your magic!
  const post = {
    text: req.body.text
    // user_id: req.params.id
  };

  db.insert(post)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      debug("Error: ", error);
      res.status(500).send({
        message: "There was an issue posting this to the server.",
        error,
        error_message: error.message
      });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  postDb
    .get()
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).send({ message: "Does not exist" });
      }
    })
    .catch(err => {
      debug("Error: ", error);
      res.status(500).send({
        message: "something went wrong trying to get the posts",
        error: err,
        error_message: err.message
      });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
