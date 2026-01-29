import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { fullUrl } = req.body;

    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      return res.status(409).send(urlFound);
    }

    const shortUrl = await urlModel.create({ fullUrl });
    return res.status(201).send(shortUrl);

  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!!" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: -1 });

    if (shortUrls.length === 0) {
      return res.status(404).send({ message: "Short Urls not found !!" });
    }

    return res.status(200).send(shortUrls);

  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!!" });
  }
};

export const getUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = req.params.id as string;

    const shortUrl = await urlModel.findOne({ shortUrl: id });
    if (!shortUrl) {
      return res.status(404).send({ message: "Full Url not found" });
    }

    shortUrl.clicks += 1;
    await shortUrl.save();

    return res.redirect(shortUrl.fullUrl);

  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!!" });
  }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const id = req.params.id as string;

    const deletedUrl = await urlModel.findByIdAndDelete(id);
    if (!deletedUrl) {
      return res.status(404).send({ message: "Url not found" });
    }

    return res
      .status(200)
      .send({ message: "Requested Url successfully deleted" });

  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!!" });
  }
};
