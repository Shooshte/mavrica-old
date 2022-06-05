import neo4j from "neo4j-driver";
import { INITIAL_DATA } from "./seed.data";
import type { NextApiRequest, NextApiResponse } from "next";

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS)
);

const session = driver.session();

export const clearDb = async () => {
  const deleteQuery = `
    MATCH (n)
    DETACH DELETE n
    `;
  await session.writeTransaction((tx) => tx.run(deleteQuery));
};

export const seedColors = async () => {
  const writeQuery = `
    UNWIND $colors as color 
        MERGE (c:Color {hex: color.hex})
            ON CREATE 
                SET c.hex = color.hex  
                SET c.name = color.name
                SET c.alternativeNames = color.alternativeNames
                SET c.temperature = color.temperature
    WITH color, c UNWIND color.tags as tag 
                MERGE(c)-[a:ASSOCIATED_WITH]->(:Tag {name: tag})
    RETURN $colors AS colors
    `;
  await session.writeTransaction((tx) =>
    tx.run(writeQuery, { colors: INITIAL_DATA })
  );
};

export const seedData = async () => {
  try {
    await clearDb();
    await seedColors();
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    session.close();
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await seedData();
    res.status(200).json("done");
  } catch (e) {
    res.status(500).json(e);
  }
};
