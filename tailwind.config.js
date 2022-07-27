const IS_PROD = process.env.NODE_ENV !== 'development';
const twBaseName = '';
module.exports = {
  mode: IS_PROD ? '' : 'jit',
  important: true,
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        [`${twBaseName}base`]: ['12px', { lineHeight: 0 }],
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
};
