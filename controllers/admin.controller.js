import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admins from "../models/admin.model.js";
const { FRONT_LINK, JWT_SECRET } = process.env;

export const login = async (req, res) => {
    Admins.findOne({ where: { email: req.body.email } })
    .then((admin) => {
        if (!admin)
        return res
            .status(404)
            .json({ succes: false, message: "Cet admin n'existe pas." });

        bcrypt
        .compare(req.body.password, admin.password)
        .then((isPasswordValid) => {
            if (!isPasswordValid)
            return res
                .status(401)
                .json({ succes: false, message: "Mot de passe incorrect." });

            const payload = {
                adminId: admin.admin_id,
                role: "admin",
            };

            const token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "24h",
            });

            return res.status(202).json({
                success: true,
                message: "L'Admin a été connecté avec succès.",
                data: admin,
                token,
            });
        });
    })
    .catch((error) =>
        res.status(503).json({
            success: false,
            message: `L'Admin n'a PAS été connecté. Veuillez réessayer.`,
            error: error,
        })
    );
};
