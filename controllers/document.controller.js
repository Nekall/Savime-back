import Documents from "../models/document.model.js";
import Employees from "../models/employee.model.js";

// helpers
import { scanBase64 } from "../helpers/scanBase64.js";

export const create = async (req, res) => {
  const { name, document, type, employeeId } = req.body;

  const scanResult = await scanBase64(document);
  if (!scanResult)
    return res.status(400).send({
      success: false,
      message: "Le document n'a pas pu être créé.",
      error: "Virus détecté",
    });

  try {
    if (type === "attestation" || type === "contract") {
      const checkIfExisted = await Documents.findOne({
        where: { employee_id: employeeId, type },
      });
      if (checkIfExisted)
        return res.status(400).send({
          success: false,
          message: "Un document de ce type existe déjà pour cet·te employé·e.",
        });
    }

    const employee = await Employees.findOne({
      where: { employee_id: employeeId },
    });

    if (employee === null)
      return res.status(404).send({
        success: false,
        message: "L'employé·e n'existe pas.",
      });

    try {
      await Documents.create({
        name,
        document,
        type,
        employee_id: employeeId,
      });
      return res.status(201).send({
        success: true,
        message: "Document créé avec succès.",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: "Le document n'a pas pu être créé.",
        error: error,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Le document n'a pas pu être créé.",
      error: error,
    });
  }
};

export const update = async (req, res) => {
  const scanResult = await scanBase64(req.body.document);
  if (!scanResult)
    return res.status(400).send({
      success: false,
      message: "Le document n'a pas pu être mis à jour.",
      error: "Virus détecté",
    });

  if (req.body.type !== "undefined") {
    if (req.body.type === "attestation" || req.body.type === "contract") {
      const checkIfExisted = await Documents.findOne({
        where: {
          employee_id: req.body.employee_id
            ? req.body.employee_id
            : document.employee_id,
          type: req.body.type ? req.body.type : document.type,
        },
      });
      if (checkIfExisted)
        return res.status(400).send({
          success: false,
          message: "Un document de ce type existe déjà pour cet·te employé·e.",
        });
    }
  }

  const document = await Documents.findOne({
    where: { document_id: req.params.id },
  });
  if (document === null)
    return res
      .status(404)
      .send({ success: true, message: "Document introuvable.", document });

  const updatedData = {
    name: req.body.name ? req.body.name : document.name,
    document: req.body.document ? req.body.document : document.document,
    type: req.body.type ? req.body.type : document.type,
    employee_id: req.body.employee_id
      ? req.body.employee_id
      : document.employee_id,
  };

  try {
    await Documents.update(updatedData, {
      where: {
        document_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Le document a été mis à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Le document n'a pas pu être mis à jour.",
      error: err,
    });
  }
};

export const deleteDoc = async (req, res) => {
  const document = await Documents.findOne({
    where: { document_id: req.params.id },
  });
  if (document) {
    try {
      await Documents.destroy({
        where: {
          document_id: req.params.id,
        },
      });
      return res.status(200).send({
        success: true,
        message: "Le document a été supprimé avec succès.",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "Le document n'a pas pu être supprimé.",
      });
    }
  } else {
    return res
      .status(404)
      .send({ success: true, message: "Document introuvable." });
  }
};

export const findOne = async (req, res) => {
  const document = await Documents.findOne({
    where: { document_id: req.params.id },
  });
  return res.status(document ? 200 : 404).send({
    success: document ? true : false,
    message: document
      ? `Document avec id n°${document.document_id} a été trouvé avec succès.`
      : "Document introuvable.",
    data: document,
  });
};

export const findAll = async (req, res) => {
  const allDocuments = await Documents.findAll({ include: Employees });
  return res.status(200).send({
    success: true,
    message: `${allDocuments.length} documents on été trouvés.`,
    data: allDocuments,
  });
};

export const findAllByEmployee = async (req, res) => {
  const allDocuments = await Documents.findAll({
    where: { employee_id: req.params.id },
  });

  return res.status(200).send({
    success: true,
    message: `${allDocuments.length} documents on été trouvés.`,
    data: allDocuments,
  });
};
