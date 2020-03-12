const db = require("../users/userDb");

const validateUserId = (req, res, next) => {
  const userId = req.params.id;

  db.getById(userId)
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
        message: "Error validating user ID",
        error: error,
        error_message: error.response
      });
    });
};

module.exports = validateUserId;
