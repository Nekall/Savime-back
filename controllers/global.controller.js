import jwt from "jsonwebtoken";
import fs from "fs";
const { JWT_SECRET } = process.env;

// Helpers
import { sendMail } from "../helpers/sendMail.js";

export const contact = async (req, res) => {
  const { firstname, lastname, email, text } = req.body;

  await sendMail(
    "contact@savime.tech",
    "Savime | Prise de Contact",
    `Demande d'informations ou suggestions d'améliorations de la part de <br />
        ${firstname} ${lastname} <br/>
        (${email})<br />
        MESSAGE: <br />
        ${text}<br />
        `
  )
    .then(() => {
      return res.status(200).send({
        success: true,
        message: "Votre message a bien été envoyé.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        success: false,
        message: "Votre message n'a pas pu être envoyé.",
      });
    });
};

export const newsletters = async (req, res) => {
  const { email } = req.body;

  fs.open("data/newsletters_list.txt", "a", (err, fd) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.writeFile("data/newsletters_list.txt", email + "\n", (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message:
                "Votre inscription à la newsletter n'a pas pu être prise en compte.",
            });
          }
        });
        return;
      }
      return res.status(500).send({
        success: false,
        message:
          "Votre inscription à la newsletter n'a pas pu être prise en compte.",
      });
    }
    fs.write(fd, email + "\n", (err) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message:
            "Votre inscription à la newsletter n'a pas pu être prise en compte.",
        });
      }
      fs.close(fd, (err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message:
              "Votre inscription à la newsletter n'a pas pu être prise en compte.",
          });
        }
      });
    });
  });

  await sendMail(
    email,
    "Savime | Inscription Newsletters",
    `Vous êtes désormais inscrit à la newsletter de Savime;<br/>
        Nous vous enverrons pas plus d'un mail par moi pour vous informer de l'avancer du projet !<br/>
        Merci pour votre intérêt et votre confiance;<br/>
        L'équipe de Savime.<br/>
        `
  )
    .then(() => {
      return res.status(200).send({
        success: true,
        message:
          "Votre inscription à la newsletter a bien été prise en compte.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        success: false,
        message:
          "Votre inscription à la newsletter n'a pas pu être prise en compte.",
      });
    });
};

export const jwtTokenVerification = async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Token invalide.",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Token valide.",
      });
    }
  });
};
