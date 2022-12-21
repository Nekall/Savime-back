import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employees from "../models/employee.model.js";
const { FRONT_LINK, JWT_SECRET } = process.env;

// Helpers
import { sendMail } from "../helpers/sendMail.js";

export const create = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  if (password != confirmPassword) {
    return res.status(400).json({ success: true, message: "Les mots de passe ne sont pas les mêmes." });
  }
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
      return res.status(201).send({
        success: true,
        message: "Le compte de l'employé·e a été créé avec succès.",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Le compte de l'employé·e n'a pas pu être créé.",
      });
    }
  } else {
    return res
      .status(400)
      .send({ success: false, message: "L'adresse e-mail existe déjà." });
  }
};

export const update = async (req, res) => {
  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  if (employee === null)
    return res
      .status(404)
      .send({ success: true, message: "Employé·e introuvable.", employee });

  const updatedData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    profilePicture: req.body.profilePicture? req.body.profilePicture : employee.profilePicture,
  };

  try {
    await Employees.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Le compte de l'employé·e a été mis à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Le compte de l'employé·e n'a pas pu être mis à jour.",
    });
  }
};

export const findOne = async (req, res) => {
  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  return res.status(employee ? 200 : 404).send({
    success: employee ? true : false,
    message: employee
      ? `Employé·e avec id n°${employee.id} a été trouvé avec succès.`
      : "Employé·e introuvable.",
    employee,
  });
};

export const findAll = async (req, res) => {
  const allEmployees = await Employees.findAll();
  return res.status(200).send({
    success: true,
    message: `${allEmployees.length} employé·es on été trouvés.`,
    allEmployees,
  });
};

export const remove = async (req, res) => {
  const employee = await Employees.findOne({
    where: { id: req.params.id },
  });
  return res.status(employee ? 200 : 404).send({
    success: employee ? true : false,
    message: employee ? "Employé·e supprimé avec succès." : "Employé·e introuvable.",
    employee,
  });
};

export const login = async (req, res) => {
  Employees.findOne({ where: { email: req.body.email } })
    .then((employee) => {
      if (!employee)
        return res
          .status(404)
          .json({ success: false, message: "Ce compte n'a pas été trouvé." });

      bcrypt
        .compare(req.body.password, employee.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid)
            return res
              .status(401)
              .json({ success: false, message: "Mot de passe incorrect." });

          const payload = {
            employeeId: employee.employee_id,
            role: "Employee",
          };

          const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "24h",
          });

          return res
            .status(202)
            .json({
              success: true,
              message: `L'employé·e n°${employee.id} a été connecté avec succès.`,
              data: employee,
              token,
            });
        });
    })
    .catch((error) =>
      res
        .status(503)
        .json({
          success: false,
          message: "L'employé·e n'a PAS été connecté. Veuillez réessayer.",
          error: error,
        })
    );
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const employee = await Employees.findOne({ where: { email: email } });
  if(employee){
    const token = jwt.sign({ id: employee.id, email: employee.email }, JWT_SECRET, {
      expiresIn: "10m",
    });
    await Employees.update({ resetToken: token }, { where: { id: employee.id } });
    const response = await sendMail(
      email, 
      "Savime | Demande reinitialisation du mot de passe", 
      `Cliquez sur ce lien pour reinitialiser votre mot de passe : <br/>
      <a href="${FRONT_LINK}/reinitialisation-mot-de-passe/${token}">REINITIALISER</a><br/>
      Ce lien est valide pendant 10 minutes.<br/>
      Si vous n'avez pas fait cette demande, ignorez ce mail.<br/>
      <br/>
      L'équipe Savime<br/>
      <br/>
      ${FRONT_LINK}/reinitialisation-mot-de-passe/${token}
      `,
      );
      return res.status(200).json({ success: true, data: response, message: "Mail envoyé." });
  } else {
    return res.status(404).json({ success: false, message: "Le compte n'existe pas." });
  }
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Les mots de passe ne sont pas les mêmes." });
  }

  jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Lien non valide ou expiré." });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const employee = await Employees.findOne({ where: { email: decodedToken.email } });

    if(employee.resetToken !== token){
      return res.status(400).json({ success: false, message: "Lien non valide ou expiré." });
    }

    if(employee){
      await Employees.update({ password: hashPassword, resetToken: null }, { where: { id: employee.id } });
      return res.status(200).json({ success: true, message: "Mot de passe mis à jour." });
    } else {
      return res.status(404).json({ success: false, message: "Le compte n'existe pas." });
    }
  });
}