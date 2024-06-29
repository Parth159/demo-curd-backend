const { response, pagination } = require("../constants/reponce");
const User = require("../Models/users");
const { InternalServerError } = require("../constants/status");
const { success } = require("../constants/strings");
const { cleanObject } = require("../utils/object_helper");
const { isValidRequest } = require("../constants/request_validator");

exports.test = async (req, res) => {
  try {
    return res.json(response(true, success));
  } catch (e) {
    return res.status(InternalServerError).json(response(false, e.message));
  }
};

exports.getUsers = async (req, res) => {
  try {
    if (req.body.id) {
      const result = await User.findById(req.body.id);
      return res.json(response(true, success, cleanObject(result._doc)));
    }
    const limit = parseInt(req.body.limit) || 10;
    const page = parseInt(req.body.page) || 1;
    const filter = {
      name: {
        $regex: (req.body.name || "").trim().toLowerCase(),
        $options: "i",
      },
    };
    if (req.body.status !== undefined && req.body.status !== "") {
      filter.status = req.body.status;
    }
    const sortData = req.body.sort || { created_at: -1 };
    const result = await User.find(filter)
      .sort(sortData)
      .skip((page - 1) * limit)
      .limit(limit);
    result.map(({ _doc, ...keepAttrs }) => {
      return cleanObject(_doc);
    });
    const count = await User.count(filter);
    return res.json(
      response(true, success, pagination(page, limit, count, result))
    );
  } catch (e) {
    return res.status(InternalServerError).json(response(false, e.message));
  }
};

exports.addUser = async (req, res) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  try {
    const data = req.body;

    const resultUser = await User.findOne({ email: data.email });
    if (resultUser) {
      return res.json(response(false, "Email Already Exists"));
    }
    const newUser = User({
      name: data.name.trim(),
      course: data.course,
      email: data.email,
      mobile: data.mobile,
      dob: data.dob,
      gender: data.gender,
    });
    const result = await newUser.save();
    return res.json(response(true, success, cleanObject(result._doc)));
  } catch (e) {
    if (e.name == "MongoServerError") {
      return res.json(response(false, "Duplicate Store name"));
    }
    return res.status(InternalServerError).json(response(false, e.message));
  }
};

exports.patchUser = async (req, res) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  try {
    const data = req.body;
    const filter = { _id: data.id };
    delete data.id;
    delete data.created_at;
    if (data.email) {
      const resultUser = await User.findOne({ email: data.email });
      if (resultUser) {
        return res.json(response(false, "Email Already Exists"));
      }
    }
    const result = await User.findOneAndUpdate(filter, data, {
      new: true,
    });

    return res.json(response(true, success, cleanObject(result._doc)));
  } catch (e) {
    return res.status(InternalServerError).json(response(false, e.message));
  }
};

exports.deleteUser = async (req, res) => {
  if (!isValidRequest(req, res)) {
    return;
  }
  try {
    const data = req.body;
    const result = await User.findByIdAndDelete(data.id);

    return res.json(response(true, success, cleanObject(result._doc)));
  } catch (e) {
    return res.status(InternalServerError).json(response(false, e.message));
  }
};
