const { plugin } = require("mongoose");

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@": './src',
        },
      },
    ],
  ],
};

