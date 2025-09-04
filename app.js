import express from "express";
const app = express();
export default app;
import folderRoutes from "./API/folders.js";
import fileRoutes from "./API/files.js";

app.use(express.json());

app.use("/folders", folderRoutes);
app.use("/files", fileRoutes);

app.route("/").get((req, res) => {
  res.send("welcome to the ultimate API to organize your folders");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("OH NO, SOMETHING WENT TOTALLY WRONG! :(");
});
