const debug = require("debug")("app:dev");
const validateUser = require("../middleware/validateUser");
const validatePost = require("../middleware/validatePost");
const validateUserId = require("../middleware/validateUserId");
const db = require("./userDb");
const express = require("express");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  const user = {
    name: req.body.name
  };

  try {
    db.insert(user).then(response => {
      res.status(201).send(response);
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({
      message: "There was an issue posting this to the server.",
      error,
      error_message: error
    });
  }
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  console.log("PARAMMS: ", req.params);
  // do your magic!
  const post = {
    text: req.body.text
    // user_id: req.params.id
  };

  db.insert(post)
    .then(change => {
      res.status(201).json(change);
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
  db.get()
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).send({ message: "No users exist!" });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).send({
        message: "There is an issue with the servers",
        error,
        error_message: error
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  const userId = req.params.id;

  db.getById(userId)
    .then(user => {
      console.log(user);
      res.status(200).json({ user });
    })
    .catch(error => {
      res.status(500).send({
        message: "Something went wrong with the server",
        error,
        error_message: error
      });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  const userId = req.params.id;
  db.getUserPosts(userId)
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(404).send({ message: "There are no posts for this user!" });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: "There was an error retrieving the posts from the server.",
        error,
        error_message: error
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const userId = req.params.id;

  db.remove(userId)
    .then(users => res.json(users))
    .catch(err => {
      res.status(500).send({
        message: "There was an error deleting user from the server.",
        error: err,
        error_message: err.message
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  const userId = req.params.id;
  const updatedUser = {
    name: req.body.name
  };

  db.update(userId, updatedUser)
    .then(updates => {
      debug("Updates: ", updates);
      res.status(200).json(updates);
    })
    .catch(err =>
      res.status(500).send({
        message: "There was an error updating the user in the server.",
        error: err,
        error_message: err.message
      })
    );
});

module.exports = router;
