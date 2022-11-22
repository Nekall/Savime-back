import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Managers from "../models/manager.model.js";

export const create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (password != confirmPassword) {
    const message = `Passwords are not the same.`;
    return res.status(400).json({ message });
  }
  const accountExists = await Managers.findOne({
    where: { email: req.body.email },
  });
  if (!accountExists) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Managers.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashPassword,
      });
      return res.status(201).send({
        success: true,
        message: "Manager account successfully created.",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Manager's account could not be created.",
      });
    }
  } else {
    return res
      .status(400)
      .send({ success: false, message: "Email address already exists." });
  }
};

export const update = async (req, res) => {
  const updatedData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  const manager = await Managers.findOne({
    where: { id: req.params.id },
  });
  if (manager === null)
    return res
      .status(404)
      .send({ success: true, message: "Manager not found.", manager });

  try {
    await Managers.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Manager's account has been successfully updated.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Manager's account could not be updated.",
    });
  }
};

export const findOne = async (req, res) => {
  const manager = await Managers.findOne({
    where: { id: req.params.id },
  });
  return res.status(manager ? 200 : 404).send({
    success: manager ? true : false,
    message: manager
      ? `Manager with id n°${manager.id} has been successfully found.`
      : "Manager not found.",
    manager,
  });
};

export const findAll = async (req, res) => {
  const allManagers = await Managers.findAll();
  return res.status(200).send({
    success: true,
    message: `Found ${allManagers.length} managers.`,
    allManagers,
  });
};

export const remove = async (req, res) => {
  const manager = await Managers.findOne({
    where: { id: req.params.id },
  });
  return res.status(manager ? 200 : 404).send({
    success: manager ? true : false,
    message: manager ? "Manager successfully removed" : "Manager not found",
    manager,
  });
};

export const login = async (req, res) => {
  Managers.findOne({ where: { email: req.body.email } })
    .then((manager) => {
      if (!manager)
        return res
          .status(404)
          .json({ succes: false, message: "This manager does not exist." });

      bcrypt
        .compare(req.body.password, manager.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid)
            return res
              .status(401)
              .json({ succes: false, message: `Wrong password.` });

          const token = jwt.sign({ managerId: manager.id }, jwtSecret, {
            expiresIn: "24h",
          });

          return res
            .status(202)
            .json({
              success: true,
              message: `manager has been successfully logged in.`,
              data: manager,
              token,
            });
        });
    })
    .catch((error) =>
      res
        .status(503)
        .json({
          success: false,
          message: `manager has NOT been logged in. Please try again.`,
          error: error,
        })
    );
};