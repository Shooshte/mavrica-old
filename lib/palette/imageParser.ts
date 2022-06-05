import path from "path";
import JIMP from "jimp";

import { consolidateColors } from "../color";

import type { ColorCount } from "../../types/color";

const ROUND_RGB_TO = 5;
const MAX_IMAGE_SIZE = 2000; // max width or height of the image

export const getFileColors = async (
  inclusionPercentage: number
): Promise<ColorCount[]> => {
  const dirRelativeToPublicFolder = "images";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  const filePath = `${dir}/test4.jpeg`;

  let data = {};
  const jimpImage = await JIMP.read(filePath);

  const height = jimpImage.bitmap.height;
  const width = jimpImage.bitmap.width;

  const scaleToHeight = height > width;

  let desiredHeight;
  let desiredWidth;

  if (scaleToHeight) {
    desiredHeight = MAX_IMAGE_SIZE;
    const scaleBy = MAX_IMAGE_SIZE / height;
    desiredWidth = width * scaleBy;
  } else {
    desiredWidth = MAX_IMAGE_SIZE;
    const scaleBy = MAX_IMAGE_SIZE / width;
    desiredHeight = height * scaleBy;
  }

  jimpImage.cover(desiredWidth, desiredHeight);
  jimpImage.scan(0, 0, desiredWidth, desiredHeight, function (x, y) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // .this is the image

    const color = this.getPixelColor(x, y);
    const rgba = JIMP.intToRGBA(color);

    rgba.r = roundToNearest(rgba.r, ROUND_RGB_TO);
    rgba.g = roundToNearest(rgba.g, ROUND_RGB_TO);
    rgba.b = roundToNearest(rgba.b, ROUND_RGB_TO);
    rgba.a = roundToNearest(rgba.a, ROUND_RGB_TO);

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

  // TODO : make this cleaner, based on total number of color values
  try {
    const consolidatedColors = consolidateColors(values, 20000);
    const consolidatedColors2 = consolidateColors(consolidatedColors, 17500);
    const consolidatedColors3 = consolidateColors(consolidatedColors2, 15000);
    const consolidatedColors4 = consolidateColors(consolidatedColors3, 12500);
    const consolidatedColors5 = consolidateColors(consolidatedColors4, 10000);
    const consolidatedColors6 = consolidateColors(consolidatedColors5, 7500);
    const consolidatedColors7 = consolidateColors(consolidatedColors6, 5000);
    const consolidatedColors8 = consolidateColors(consolidatedColors7, 2500);
    const consolidatedColors9 = consolidateColors(consolidatedColors8, 1250);
    const consolidatedColors10 = consolidateColors(consolidatedColors9, 500);
    const consolidatedColors11 = consolidateColors(consolidatedColors10, 20);
    return consolidatedColors11.sort((a, b) => b.count - a.count);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const roundToNearest = (arg: number, roundTo: number) => {
  return Math.round(arg / roundTo) * roundTo;
};
