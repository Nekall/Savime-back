import jwt from "jsonwebtoken";

// Env
const { JWT_SECRET } = process.env;

const isEmployee = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).json({ error: "Authorization header is missing" });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "Employee" || decoded.role !== "Admin")
      return res.status(401).json({ error: "Unauthorized" });

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res.status(401).json({ error: "Invalid token" });

    if (err.name === "TokenExpiredError")
      return res.status(401).json({ error: "Token expired" });

    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export default isEmployee;
