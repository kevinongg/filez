import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  // const folders = [];
  for (let f = 0; f < 3; f++) {
    const folderName = faker.database.column();
    const folder = await createFolder(folderName);
    // folders.push(folder);

    // for (const folder of folders) {
    for (let i = 0; i < 5; i++) {
      await createFile({
        name: faker.company.name(),
        size: faker.number.int({ max: 100 }),
        folder_id: folder.id,
      });
    }
  }
}
