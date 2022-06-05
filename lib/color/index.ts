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

interface ColorsDistanceData {
  color1: ColorCount;
  color2: ColorCount;
  distance: number;
}

export const consolidateColors = (colors: ColorCount[]): ColorCount[] => {
  // sort colors by count
  const sortedColors = colors.sort((a, b) => a.count - b.count);
  // for smallest counts get shortest distance to another color
  const smallestCount = sortedColors[0].count;

  let smallCountColors = sortedColors.filter(
    (color) => color.count === smallestCount
  );

  let largerCountColors = sortedColors.filter(
    (color) => color.count > smallestCount
  );

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

  const shortestDistance: ColorsDistanceData = smallCountColors.reduce(
    (data, currentColor) => {
      const { distance } = data;
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

      if (distance === null || shortestDistance < distance) {
        return {
          color1,
          color2,
          distance: shortestDistance,
        };
      }
      return data;
    },
    {
      color1: {
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        count: 0,
      },
      color2: {
        rgba: {
          r: 1,
          g: 1,
          b: 1,
          a: 0,
        },
        count: 0,
      },
      distance: null,
    }
  );

  const colorToRemove =
    shortestDistance.color1.count > shortestDistance.color2.count
      ? shortestDistance.color2
      : shortestDistance.color1;
  const colorToKeep =
    shortestDistance.color1.count < shortestDistance.color2.count
      ? shortestDistance.color2
      : shortestDistance.color1;

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

  if (numberOfColors > 20) {
    console.log("consolidating, colors left: ", numberOfColors);
    return consolidateColors(consolidatedColors);
  } else {
    console.log("done consolidating!");
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
