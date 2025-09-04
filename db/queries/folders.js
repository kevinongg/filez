import db from "#db/client";

export const getAllFolders = async () => {
  const sql = `
  SELECT * FROM folders
  `;
  const { rows: folders } = await db.query(sql);
  return folders;
};

export const getFolder = async (id) => {
  const sql = `
  SELECT folders.*, 
  (SELECT json_agg(files) 
  FROM files WHERE files.folder_id = folders.id) 
  AS files 
  FROM folders WHERE id = $1
  `;
  const { rows: folder } = await db.query(sql, [id]);
  return folder[0];
};

export const createFolder = async (name) => {
  const sql = `
  INSERT INTO folders(name) VALUES($1) RETURNING *
 `;
  const { rows: folder } = await db.query(sql, [name]);
  return folder[0];
};
