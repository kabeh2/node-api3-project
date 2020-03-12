const debug = require("debug")("app:dev");
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

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  const postId = req.params.id;

  postDb
    .getById(postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).send({
        message: "There was an error retrieving post data.",
        error: err,
        error_message: err.message
      });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const postId = req.params.id;

  postDb
    .remove(postId)
    .then(post => res.status(200).json(post))
    .catch(err =>
      res.status(500).send({
        message: "There was an error deleting this post from the server.",
        error: err,
        error_message: err.message
      })
    );
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  // do your magic!
  const postId = req.params.id;
  const updatedPost = {
    text: req.body.text
  };

  postDb
    .update(postId, updatedPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err =>
      res.status(500).send({
        message: "There was an error updating the post in ther server.",
        error: err,
        error_message: err.message
      })
    );
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const postId = req.params.id;

  postDb
    .getById(postId)
    .then(user => {
      //   console.log("VALIDATEUSER:", user);
      if (!user) {
        res.status(400).send({ message: "Invalid user id" });
      } else {
        next();
        return null;
      }
    })
    .catch(error => {
      console.log("Error: ", error.response);
      res.status(500).send({
        message: "Error validating post ID",
        error: error,
        error_message: error.response
      });
    });
}

module.exports = router;
