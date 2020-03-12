const yup = require("yup");
const debug = require("debug")("app:dev");

async function validatePost(req, res, next) {
  // do your magic!
  const validation = await validateUserSchema(req.body);
  debug("VALIDATION: ", validation, typeof req.params.id);

  if (!validation) {
    res.status(400).send({ message: "Missing required fields." });
  } else {
    next();
  }
}

// VALIDATION SCHEMA FUNCTION
const validateUserSchema = async user => {
  const schema = yup.object().shape({
    text: yup.string().required("The name field is required.")
    // user_id: yup.string().required()
  });

  try {
    const response = await schema.isValid(user);

    return response;
  } catch (error) {
    debug("Error: ", error);
  }
};

module.exports = validatePost;
