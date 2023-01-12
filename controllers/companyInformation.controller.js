import CompanyInformation from "../models/companyInformation.model.js";

export const create = async (req, res) => {
  const { name, value } = req.body;
  const newCompanyInformation = await CompanyInformation.create({
    name,
    value,
  });
  return res.status(201).send({
    success: true,
    message: "Information de l'entreprise créé avec succès.",
  });
};

export const findAll = async (req, res) => {
  const allCompanyInformation = await CompanyInformation.findAll();
  return res.status(200).send({
    success: true,
    message: `${allCompanyInformation.length} informations de l'entreprise on été trouvés.`,
    data: allCompanyInformation,
  });
};

export const update = async (req, res) => {
  const companyInformation = await CompanyInformation.findOne({
    where: { company_information_id: req.params.id },
  });
  if (companyInformation === null)
    return res
      .status(404)
      .send({
        success: true,
        message: "Information de l'entreprise introuvable.",
        companyInformation,
      });

  const updatedData = {
    name: req.body.name,
    value: req.body.value,
  };

  try {
    await News.update(updatedData, {
      where: {
        company_information_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Information de l'entreprise mise à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "L'information de l'entreprise n'a pas pu être mise à jour.",
      error: err,
    });
  }
};

export const deleteInfo = async (req, res) => {
  const companyInformation = await CompanyInformation.findOne({
    where: { company_information_id: req.params.id },
  });
  if (companyInformation === null)
    return res
      .status(404)
      .send({
        success: true,
        message: "Information de l'entreprise introuvable.",
        companyInformation,
      });

  try {
    await CompanyInformation.destroy({
      where: {
        company_information_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "L'information de l'entreprise a été supprimé avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "L'information de l'entreprise n'a pas pu être supprimé.",
    });
  }
};

export const findOne = async (req, res) => {
  const companyInformation = await CompanyInformation.findOne({
    where: { company_information_id: req.params.id },
  });
  return res.status(companyInformation ? 200 : 404).send({
    success: companyInformation ? true : false,
    message: companyInformation
      ? `L'information de l'entreprise avec id n°${companyInformation.company_information_id} a été trouvé avec succès.`
      : "Information de l'entreprise introuvable.",
    data: companyInformation,
  });
};
