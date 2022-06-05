import { session } from "./driver";

import type { Color } from "../../types/color";

export const getColorsList = async (): Promise<Color[]> => {
  const readQuery = `
    MATCH (c:Color)-[a:ASSOCIATED_WITH]->(t:Tag)
    WITH COLLECT(t.name) AS tags, c
    RETURN  c.alternativeNames AS alternativeNames, c.hex AS hex, c.name AS name, c.temperature AS temperature, tags AS tags
  `;
  const readResult = await session.readTransaction((tx) => tx.run(readQuery));

  const colors: Color[] = readResult.records.map((color) => {
    const alternativeNames = color.get("alternativeNames");
    const hex = color.get("hex");
    const name = color.get("name");
    const temperature = color.get("temperature");
    const tags = color.get("tags");
    return {
      alternativeNames,
      hex,
      name,
      temperature,
      tags,
    };
  });

  return colors;
};
