// const webpack = require("webpack");

module.exports = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  distDir: "build",
};
