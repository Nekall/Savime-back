import Documents from "../models/document.model.js";
import Employees from "../models/employee.model.js";

export const create = async (req, res) => {
  const { name, document, employeeId } = req.body;
  const newDocument = await Documents.create({
    name,
    document,
    employee_id: employeeId,
  });
  return res.status(201).send({
    success: true,
    message: "Document créé avec succès.",
  });
};

export const deleteDoc = async (req, res) => {
  const document = await Documents.findOne({
    where: { document_id: req.params.id },
  });
  if (document === null)
    return res
      .status(404)
      .send({ success: true, message: "Document introuvable.", document });

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
};

export const findOne = async (req, res) => {
  const document = await Documents.findOne({
    where: { document_id: req.params.id },
  });
  return res.status(document ? 200 : 404).send({
    success: document ? true : false,
    message: document
      ? `Document avec id n°${document.id} a été trouvé avec succès.`
      : "Document introuvable.",
    document,
  });
}

export const findAll = async (req, res) => {
  const allDocuments = await Documents.findAll();
  return res.status(200).send({
    success: true,
    message: `${allDocuments.length} documents on été trouvés.`,
    data: allDocuments,
  });
}

export const findAllByEmployee = async (req, res) => {
  const allDocuments = await Documents.findAll({
    where: { employee_id: req.params.id },
    include: Employees 
  });

  return res.status(200).send({
    success: true,
    message: `${allDocuments.length} documents on été trouvés.`,
    data: allDocuments,
  });
}
