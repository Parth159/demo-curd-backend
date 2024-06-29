const jwt = require("jsonwebtoken");
const Settings = require("../Models/settings");

exports.createToken = async (id, device_id) => {
  const expirein = await Settings.findOne({
    settings_key: "api_token_validity",
  });
  console.log("Token Generated For: " + expirein._doc.settings_value);
  return jwt.sign(
    {
      id,
      device_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: expirein._doc.settings_value
        ? expirein._doc.settings_value + "h"
        : process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.createRefreshToken = (id, device_id) => {
  return jwt.sign(
    {
      id,
      device_id,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};
