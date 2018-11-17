const { toRGBString } = require("../colors");

function getIndentGuidesReplacements(_configuration, colors) {
  const { blueGrays } = colors;

  return [
    ["DEFAULT_DEFAULT_LINE_COLOR", toRGBString(blueGrays[4])],
    ["DEFAULT_DEFAULT_HIGHLIGHT_COLOR", toRGBString(blueGrays[6])],
    ["DEFAULT_UNALIGNED_LINE_COLOR", toRGBString(colors.purples[39])],
    ["DEFAULT_UNALIGNED_HIGHLIGHT_COLOR", toRGBString(colors.purples[39])]
  ];
}

module.exports = {
  getIndentGuidesReplacements
};
