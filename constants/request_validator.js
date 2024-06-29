const { validationResult } = require("express-validator");
const { BadRequest } = require("../constants/status");
const { response } = require("../constants/reponce");

exports.isValidRequest = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    res.json(response(false, validationResult(req).array()[0].msg));
    return false;
  }
  return true;
};
