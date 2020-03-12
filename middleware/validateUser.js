const yup = require("yup");
const debug = require("debug")("app:dev");

async function validateUser(req, res, next) {
  // do your magic!
  const validation = await validateUserSchema(req.body);
  debug("VALIDATION: ", validation);

  if (!validation) {
    res.status(400).send({ message: "Missing required name field" });
  } else {
    next();
  }
}

// VALIDATION SCHEMA FUNCTION
const validateUserSchema = async user => {
  const schema = yup.object().shape({
    name: yup.string().required("The name field is required.")
  });

  try {
    const response = await schema.isValid(user);

    return response;
  } catch (error) {
    debug("Error: ", error);
  }
};

module.exports = validateUser;
