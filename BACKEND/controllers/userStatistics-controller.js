const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");
const UserStatistc = require("../models/userStatistic");

const getAllUserStatistics = async (req, res, next) => {
  let users;
  try {
    users = await UserStatistc.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Samething went wrong, please try again", 404));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("errors:", errors);
    return next(
      new HttpError("Invalid inputs passed, please check uour data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserStatistc.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Samething went wrong, please try again", 404));
  }

  if (existingUser) {
    return next(
      new HttpError("User already exists, please try logging in.", 500)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Samething went wrong, please try again", 404));
  }

  const createdUserStatistics = new UserStatistc({
    name,
    email,
    password: hashedPassword,
    ticTacToeStatistic: {
      hard: {
        victory: 0,
        loss: 0,
        draw: 0,
        averageRating: 0,
      },
      easy: {
        victory: 0,
        loss: 0,
        draw: 0,
        averageRating: 0,
      },
    },
    snakeStatistic: {
      hard: 0,
      easy: 0,
      medium: 0,
    },
    matchingCardStatistic: {
      hard: 0,
      easy: 0,
      medium: 0,
    },
  });

  try {
    await createdUserStatistics.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ user: createdUserStatistics, email: createdUserStatistics.email });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserStatistc.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Samething went wrong, please try again", 404));
  }

  if (!existingUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be worng.",
        401
      )
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError("Samething went wrong, please try again", 500));
  }

  if (!isValidPassword) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be worng.",
        401
      )
    );
  }

  res.json({
    user: existingUser.toObject({ getters: true }),
    email: existingUser.email,
  });
};

exports.getAllUserStatistics = getAllUserStatistics;
exports.signup = signup;
exports.login = login;
