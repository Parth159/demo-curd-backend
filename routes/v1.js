const express = require("express");
const router = express.Router();

//Validators
const { check, oneOf } = require("express-validator");

//Controllers
const userController = require("../controllers/user_controller");

//Routes
const route = require("../constants/routes");
const course = require("../constants/course");
const gender = require("../constants/gender");

// Test route
router.get(route.home, [], userController.test);
router.post(route.getUsers, [], userController.getUsers);
router.post(
  route.user,
  [
    check("name").notEmpty().withMessage("name is required"),
    check("course").notEmpty().withMessage("course is required"),
    check("course")
      .isIn(Object.values(course))
      .withMessage("course is invalid"),
    check("gender").notEmpty().withMessage("gender is required"),
    check("gender")
      .isIn(Object.values(gender))
      .withMessage("gender is invalid"),
    check("email").notEmpty().withMessage("email is required"),
    check("email").isEmail().withMessage("email is invalid"),
    check("mobile").notEmpty().withMessage("mobile is required"),
    check("mobile")
      .isInt({ min: 1000000000, max: 9999999999 })
      .withMessage("mobile is invalid"),
    check("dob").notEmpty().withMessage("dob is required"),
  ],
  userController.addUser
);

router.patch(
  route.user,
  [
    check("id").notEmpty().withMessage("id is required"),
    check("id").isMongoId().withMessage("id is invalid"),
    check("name")
      .if((value) => req.body.name)
      .notEmpty()
      .withMessage("name is required"),
    check("course")
      .if((value) => req.body.course)
      .isIn(Object.values(course))
      .withMessage("course is invalid"),
    check("gender")
      .if((value) => req.body.gender)
      .isIn(Object.values(gender))
      .withMessage("gender is invalid"),
    check("email")
      .if((value) => req.body.email)
      .isEmail()
      .withMessage("email is invalid"),
    check("mobile")
      .if((value) => req.body.mobile)
      .isInt({ min: 1000000000, max: 9999999999 })
      .withMessage("mobile is invalid"),
  ],
  userController.patchUser
);

router.delete(
  route.user,
  [
    check("id").notEmpty().withMessage("id is required"),
    check("id").isMongoId().withMessage("id is invalid"),
  ],
  userController.deleteUser
);

module.exports = router;
