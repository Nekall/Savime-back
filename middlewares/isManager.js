import jwt from "jsonwebtoken";

// Env
const { JWT_SECRET } = process.env;

const isManager = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send({
      success: false,
      message: "L'en-tête d'autorisation est manquante.",
    });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "Manager" && decoded.role !== "Admin")
      return res.status(401).send({
        success: false,
        message: "Non autorisé.",
      });

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res.status(401).send({
        success: false,
        message: "Jeton invalide.",
      });

    if (err.name === "TokenExpiredError")
      return res.status(401).send({
        success: false,
        message: "Jeton expiré.",
      });

    return res.status(500).send({
      success: false,
      message: "Une erreur inattendue s'est produite.",
    });
  }
};

export default isManager;
