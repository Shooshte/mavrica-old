import path from "path";
import JIMP from "jimp";

import { consolidateColors } from "../color";

import type { ColorCount } from "../../types/color";

export const getFileColors = async (
  inclusionPercentage: number
): Promise<ColorCount[]> => {
  const dirRelativeToPublicFolder = "images";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  const filePath = `${dir}/test1.png`;

  let data = {};
  const jimpImage = await JIMP.read(filePath);

  const height = jimpImage.bitmap.height;
  const width = jimpImage.bitmap.width;

  jimpImage.scan(0, 0, width, height, function (x, y) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // .this is the image

    const color = this.getPixelColor(x, y);
    const rgba = JIMP.intToRGBA(color);

    rgba.r = roundToNearestTen(rgba.r);
    rgba.g = roundToNearestTen(rgba.g);
    rgba.b = roundToNearestTen(rgba.b);
    rgba.a = roundToNearestTen(rgba.a);

    const rgbaString = `${rgba.r},${rgba.g},${rgba.b},${rgba.a}`;

    const colorIncluded = data[rgbaString] !== undefined;
    if (!colorIncluded) {
      data[rgbaString] = {
        count: 1,
        rgba,
      };
    } else {
      data[rgbaString] = {
        count: data[rgbaString].count + 1,
        rgba,
      };
    }
  });

  const allPixels = height * width;
  const inclusionCount = (inclusionPercentage * allPixels) / 100;

  const values = Object.keys(data)
    .map((key) => data[key])
    .filter((c) => c.count >= inclusionCount);

  return consolidateColors(values);
};

const roundToNearestTen = (arg: number) => {
  return Math.round(arg / 10) * 10;
};
