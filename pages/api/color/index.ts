import { getColorsList } from "../../../lib/db/color";

import type { Color } from "../../../types/color";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<Color[]>) => {
  try {
    const colors = await getColorsList();
    res.status(200).json(colors);
  } catch (e) {
    res.status(500).json(e);
  }
};
