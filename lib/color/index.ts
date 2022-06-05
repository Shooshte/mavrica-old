import type { ColorCount, RGBA, RGB } from "../../types/color";

export const calcDecimalRGB = ({ r, g, b, a }: RGBA): RGB => {
  return {
    r: r / 255,
    b: b / 255,
    g: g / 255,
  };
};

export const sRGBtoLin = (colorChannel: number) => {
  // Send this function a decimal sRGB gamma encoded color value
  // between 0.0 and 1.0, and it returns a linearized value.
  if (colorChannel <= 0.04045) {
    return colorChannel / 12.92;
  } else {
    return Math.pow((colorChannel + 0.055) / 1.055, 2.4);
  }
};

export const calcLuminance = ({ r, g, b }: RGB): number => {
  const luminance =
    0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
  return luminance;
};

export const YtoLstar = (luminance: number) => {
  // Send this function a luminance value between 0.0 and 1.0,
  // and it returns L* which is "perceptual lightness"
  if (luminance <= 216 / 24389) {
    // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
    return luminance * (24389 / 27);
    // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
  } else {
    return Math.pow(luminance, 1 / 3) * 116 - 16;
  }
};

interface GetDistanceArgs {
  color1: RGBA;
  color2: RGBA;
}

export const getRelativeLuminance = (color: RGBA): number => {
  const decimalRGB = calcDecimalRGB(color);
  const luminance = calcLuminance(decimalRGB);
  const relativeLuminance = YtoLstar(luminance);

  return relativeLuminance;
};

export const getColorDistance = ({
  color1,
  color2,
}: GetDistanceArgs): number => {
  const decimalRGB1 = calcDecimalRGB(color1);
  const luminance1 = calcLuminance(decimalRGB1);
  const relativeLuminance1 = YtoLstar(luminance1);

  const decimalRGB2 = calcDecimalRGB(color2);
  const luminance2 = calcLuminance(decimalRGB2);
  const relativeLuminance2 = YtoLstar(luminance2);

  return Math.abs(relativeLuminance1 - relativeLuminance2);
};

export const consolidateColors = (
  colors: ColorCount[],
  maxColors: number
): ColorCount[] => {
  // sort colors by count
  const sortedColors = colors.sort((a, b) => a.count - b.count);
  const smallestCount = sortedColors[0].count;

  // all colors with the smallest count, sorted by relative luminance (darkest color is first)
  let smallCountColors = sortedColors
    .filter((color) => color.count === smallestCount)
    .sort((a, b) => {
      const relLum1 = getRelativeLuminance(a.rgba);
      const relLum2 = getRelativeLuminance(b.rgba);

      return relLum1 - relLum2;
    });

  // the rest of the colors, naming could probably be better
  let largerCountColors = sortedColors.filter(
    (color) => color.count > smallestCount
  );

  // Start by consolidating darkest colors first. Still need to think more about this, but it seems reasonable to consolidate the colors you notice the least first.
  if (largerCountColors.length === 0) {
    largerCountColors = sortedColors.filter(
      (color) =>
        color.rgba.r === smallCountColors[0].rgba.r &&
        color.rgba.g === smallCountColors[0].rgba.g &&
        color.rgba.b === smallCountColors[0].rgba.b &&
        color.rgba.a === smallCountColors[0].rgba.a
    );
    smallCountColors = [smallCountColors[0]];
  }

  const currentColor = smallCountColors[0];

  let shortestDistance = null;
  let color1 = null;
  let color2 = null;

  largerCountColors.forEach((color) => {
    const currentDistance = getColorDistance({
      color1: currentColor.rgba,
      color2: color.rgba,
    });
    if (shortestDistance === null) {
      shortestDistance = currentDistance;
      color1 = {
        rgba: currentColor.rgba,
        count: currentColor.count,
      };
      color2 = {
        rgba: color.rgba,
        count: color.count,
      };
    }
    if (shortestDistance > currentDistance) {
      shortestDistance = currentDistance;
      color1 = {
        rgba: currentColor.rgba,
        count: currentColor.count,
      };
      color2 = {
        rgba: color.rgba,
        count: color.count,
      };
    }
  });

  const colorToRemove = color1.count > color2.count ? color2 : color1;
  const colorToKeep = color1.count < color2.count ? color2 : color1;

  // return the bigger count of the two colors
  const consolidatedColors = sortedColors
    .filter(
      (color) =>
        !isSameColor({ color1: color.rgba, color2: colorToRemove.rgba })
    )
    .map((color) => {
      if (isSameColor({ color1: color.rgba, color2: colorToKeep.rgba })) {
        return {
          ...color,
          count: color.count + colorToRemove.count,
        };
      }

      return { ...color };
    });

  const numberOfColors = consolidatedColors.length;
  if (numberOfColors > maxColors) {
    console.log("consolidating...", numberOfColors);
    return consolidateColors(consolidatedColors, maxColors);
  } else {
    return consolidatedColors;
  }
};

interface CompareColorsArgs {
  color1: RGBA;
  color2: RGBA;
}

const isSameColor = ({ color1, color2 }: CompareColorsArgs) => {
  const rMatches = color1.r === color2.r;
  const gMatches = color1.g === color2.g;
  const bMatches = color1.b === color2.b;
  const aMatches = color1.a === color2.a;

  return rMatches && gMatches && bMatches && aMatches;
};
