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
    data: newCompanyInformation,
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
    return res.status(404).send({
      success: true,
      message: "Information de l'entreprise introuvable.",
      companyInformation,
    });

  const updatedData = {
    name: req.body.name,
    value: req.body.value,
  };

  try {
    await CompanyInformation.update(updatedData, {
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

export const updateAll = async (req, res) => {
  const updatedCompagnyInfos = req.body;

  const promises = updatedCompagnyInfos.map(async (compagnyInfo) => {
    await CompanyInformation.update(compagnyInfo, {
      where: {
        company_information_id: compagnyInfo.company_information_id,
      },
    });
  });

  try {
    await Promise.all(promises);
    return res.status(200).send({
      success: true,
      message:
        "Les informations de l'entreprise ont été mises à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message:
        "Les informations de l'entreprise n'ont pas pu être mises à jour.",
    });
  }
};

export const deleteCompanyInformation = async (req, res) => {
  const companyInformation = await CompanyInformation.findOne({
    where: { company_information_id: req.params.id },
  });
  if (companyInformation) {
    try {
      await CompanyInformation.destroy({
        where: {
          company_information_id: req.params.id,
        },
      });
      return res.status(200).send({
        success: true,
        message: "Information de l'entreprise supprimé avec succès.",
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: "L'information de l'entreprise n'a pas pu être supprimé.",
      });
    }
  } else {
    return res
      .status(404)
      .send({
        success: true,
        message: "Information de l'entreprise introuvable.",
      });
  }
};
