import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Managers from "../models/manager.model.js";
const { FRONT_LINK, JWT_SECRET } = process.env;

export const create = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (password != confirmPassword) {
    return res.status(400).json({ success: true, message: "Les mots de passe ne sont pas les mêmes." });
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
        message: "Le compte du manager a été créé avec succès.",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: "Le compte du manager n'a pas pu être créé.",
      });
    }
  } else {
    return res
      .status(400)
      .send({ success: false, message: "L'adresse e-mail existe déjà." });
  }
};

export const update = async (req, res) => {
  const updatedData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };

  const manager = await Managers.findOne({
    where: { manager_id: req.params.id },
  });
  if (manager === null)
    return res
      .status(404)
      .send({ success: true, message: "Manager introuvable.", manager });

  try {
    await Managers.update(updatedData, {
      where: {
        manager_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Le compte du manager a été mis à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Le compte du manager n'a pu être mis à jour.",
    });
  }
};

export const findOne = async (req, res) => {
  const manager = await Managers.findOne({
    where: { manager_id: req.params.id },
  });
  return res.status(manager ? 200 : 404).send({
    success: manager ? true : false,
    message: manager
      ? `Manager avec id n°${manager.manager_id} a été trouvé avec succès.`
      : "Manager introuvable.",
    manager,
  });
};

export const findAll = async (req, res) => {
  const allManagers = await Managers.findAll();
  return res.status(200).send({
    success: true,
    message: `${allManagers.length} managers trouvés..`,
    allManagers,
  });
};

export const remove = async (req, res) => {
  const manager = await Managers.findOne({
    where: { manager_id: req.params.id },
  });
  return res.status(manager ? 200 : 404).send({
    success: manager ? true : false,
    message: manager ? "Le manager a été supprimé avec succès" : "Manager introuvable.",
    manager,
  });
};

export const login = async (req, res) => {
  Managers.findOne({ where: { email: req.body.email } })
    .then((manager) => {
      if (!manager)
        return res
          .status(404)
          .json({ succes: false, message: "Ce manager n'existe pas." });

      bcrypt
        .compare(req.body.password, manager.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid)
            return res
              .status(401)
              .json({ succes: false, message: "Mot de passe incorrect." });

              const payload = {
                managerId: manager.manager_id,
                role: "Manager",
              };

              const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "24h",
          });

          return res
            .status(202)
            .json({
              success: true,
              message: "Le manager a été connecté avec succès.",
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
          message: `Le manager n'a PAS été connecté. Veuillez réessayer.`,
          error: error,
        })
    );
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const manager = await Managers.findOne({ where: { email: email } });
  if(manager){
    const token = jwt.sign({ manager_id: manager.manager_id, email: manager.email }, JWT_SECRET, {
      expiresIn: "10m",
    });
    await Managers.update({ resetToken: token }, { where: { manager_id: manager.manager_id } });
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
    const manager = await Managers.findOne({ where: { email: decodedToken.email } });

    if(manager.resetToken !== token){
      return res.status(400).json({ success: false, message: "Lien non valide ou expiré." });
    }

    if(manager){
      await Managers.update({ password: hashPassword, resetToken: null }, { where: { manager_id: manager.id } });
      return res.status(200).json({ success: true, message: "Mot de passe mis à jour." });
    } else {
      return res.status(404).json({ success: false, message: "Le compte n'existe pas." });
    }
  });
}