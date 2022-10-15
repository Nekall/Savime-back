import bcrypt from "bcrypt";
import Employees from "../models/employee.model.js";

export const create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const accountExists = await Employees.findOne({
    where: { email: req.body.email },
  });
  if (!accountExists) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Employees.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashPassword,
      });
      return res
        .status(201)
        .send({
          success: true,
          message: "Employee account successfully created.",
        });
    } catch (error) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Employee's account could not be created.",
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

  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  if (employee === null)
    return res
      .status(404)
      .send({ success: true, message: "Employee not found.", employee });

  try {
    await Employees.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .send({
        success: true,
        message: "Employee's account has been successfully updated.",
      });
  } catch (err) {
    return res
      .status(500)
      .send({
        success: false,
        message: "Employee's account could not be updated.",
      });
  }
};

export const findOne = async (req, res) => {
  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  return res
    .status(employee ? 200 : 404)
    .send({
      success: employee ? true : false,
      message: employee
        ? `Employee with id n°${employee.id} has been successfully found.`
        : "Employee not found.",
      employee,
    });
};

export const findAll = async (req, res) => {
  const allEmployees = await Employees.findAll();
  return res
    .status(200)
    .send({
      success: true,
      message: `Found ${allEmployees.length} employees.`,
      allEmployees,
    });
};

export const remove = async (req, res) => {
  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  return res
    .status(employee ? 200 : 404)
    .send({
      success: employee ? true : false,
      message: employee
        ? "Employee successfully removed"
        : "Employee not found",
      employee,
    });
};
