import express from "express";
const router = express.Router();
export default router;

import { getAllFilesWithFolderName } from "../db/queries/files.js";

router.route("/").get(async (req, res) => {
  try {
    const files = await getAllFilesWithFolderName();
    res.status(200).send(files);
  } catch (error) {
    console.log(error);
  }
});
