const culori = require("culori");

function generateScale(color, override, adjustments) {
  const maximumLightness = 100;
  const maximumChroma = 131.207;
  const lightnessMultiplier = 2.25;

  let chromaDivisor = 3;
  let hue = 0;
  let lightnessAdjustment = 0;
  let chromaAdjustment = 0;
  let chromaStartAdjustment = 0;
  let chromaEndAdjustment = 0;

  switch (color) {
    case "BLUE_GRAYS":
      hue = 270;
      chromaDivisor = 24;
      break;
    case "BLUES":
      hue = 270 - 90 / 16;
      break;
    case "PURPLES":
      hue = 315;
      break;
    case "GREENS":
      hue = 180;
      break;
    case "ORANGES":
      hue = 45;
      chromaAdjustment -= maximumChroma / 6;
      break;
  }

  if (color === "BLUE_GRAYS") {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma : 0;
    lightnessAdjustment += adjustments.lightness ? adjustments.lightness : -3;
    chromaStartAdjustment = adjustments.chromaStart
      ? adjustments.chromaStart
      : 5;
    chromaEndAdjustment = adjustments.chromaEnd ? adjustments.chromaEnd : 0;
  } else {
    chromaAdjustment += adjustments.chroma ? adjustments.chroma * 2 : 0;
  }

  const lchOverride = override ? culori.lch(override) : null;

  let shades = [];

  for (let i = 0; i < 40; i++) {
    shades.push({
      mode: "lch",
      h: lchOverride ? lchOverride.h : hue,
      l:
        (lightnessAdjustment / 40) * (39 - i) +
        (maximumLightness - lightnessMultiplier * (39 - i)),
      c:
        (chromaStartAdjustment / 40) * (39 - i) +
        (chromaEndAdjustment / 40) * i +
        (lchOverride
          ? lchOverride.c
          : maximumChroma / chromaDivisor + chromaAdjustment)
    });
  }

  return shades.map(culori.formatter("hex"));
}

function generateColorPalette(configuration) {
  const overrides = configuration.overrides ? configuration.overrides : {};

  const colorPalette = {
    blueGrays: generateScale(
      "BLUE_GRAYS",
      overrides.blueGrays,
      configuration.adjustments
    ),
    blues: generateScale("BLUES", overrides.blues, configuration.adjustments),
    purples: generateScale(
      "PURPLES",
      overrides.purples,
      configuration.adjustments
    ),
    oranges: generateScale(
      "ORANGES",
      overrides.oranges,
      configuration.adjustments
    ),
    greens: generateScale("GREENS", overrides.greens, configuration.adjustments)
  };

  return {
    ...colorPalette,
    accent: colorPalette[`${configuration.accent}s`]
  };
}

module.exports = {
  generateColorPalette
};
