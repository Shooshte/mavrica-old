import { getFileColors } from "../../lib/palette/imageParser";

import type { ColorCount } from "../../types/color";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ColorCount[]>
) => {
  try {
    const colors = await getFileColors(0);
    res.status(200).json(colors);
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
