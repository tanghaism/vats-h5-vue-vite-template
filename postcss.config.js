const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    pxtoviewport({
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 6,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['van-', '.ignore'],
      minPixelValue: 1,
      mediaQuery: true,
      replace: true,
    }),
  ],
};
