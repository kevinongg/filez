import express from "express";
const router = express.Router();
export default router;

import { getAllFolders, getFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

router.route("/").get(async (req, res) => {
  try {
    const folders = await getAllFolders();
    res.status(200).send(folders);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    const folder = await getFolder(numId);
    if (!folder) {
      return res.status(404).send("Folder does not exist");
    }
    return res.status(200).send(folder);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id/files").post(async (req, res) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    const folder = await getFolder(numId);
    if (!folder) {
      return res.status(404).send("Folder does not exist");
    }
    if (req.body === undefined || req.body === null)
      return res.status(400).send("Requested body is not provided");

    const { name, size } = req.body;
    if (!name || !size) {
      return res.status(400).send("Requested body is missing required fields");
    }
    const file = await createFile({ name, size, folder_id: numId });
    return res.status(201).send(file);
  } catch (error) {
    console.log(error);
  }
});
