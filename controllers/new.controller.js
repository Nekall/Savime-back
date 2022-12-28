import News from "../models/new.model.js";

export const create = async (req, res) => {
  const { title, content } = req.body;
  const newNews = await News.create({
    title,
    content,
  });
  return res.status(201).send({
    success: true,
    message: "Actualité créé avec succès.",
  });
};

export const update = async (req, res) => {
  const news = await News.findOne({
    where: { new_id: req.params.id },
  });
  if (news === null)
    return res
      .status(404)
      .send({ success: true, message: "Actualité introuvable.", news });

  const updatedData = {
    title: req.body.title,
    content: req.body.content,
  };

  try {
    await News.update(updatedData, {
      where: {
        new_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "L'actualité a été mise à jour avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "L'actualité' n'a pas pu être mise à jour.",
      error: err,
    });
  }
};

export const deleteNews = async (req, res) => {
  const news = await News.findOne({
    where: { new_id: req.params.id },
  });
  if (news === null)
    return res
      .status(404)
      .send({ success: true, message: "Actualité introuvable.", news });

  try {
    await News.destroy({
      where: {
        new_id: req.params.id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "L'actualité a été supprimé avec succès.",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "L'actualité n'a pas pu être supprimé.",
    });
  }
};

export const findOne = async (req, res) => {
  const news = await News.findOne({
    where: { new_id: req.params.id },
  });
  return res.status(news ? 200 : 404).send({
    success: news ? true : false,
    message: news
      ? `Actualité avec id n°${news.new_id} a été trouvé avec succès.`
      : "Actualité introuvable.",
      news,
  });
}

export const findAll = async (req, res) => {
  const allNews = await News.findAll();
  return res.status(200).send({
    success: true,
    message: `${allNews.length} actualités on été trouvés.`,
    data: allNews,
  });
}