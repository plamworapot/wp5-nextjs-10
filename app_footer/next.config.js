const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: "app_footer",
      library: { type: config.output.libraryTarget, name: "app_footer" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {},
      exposes: {
        "./Footer": "./components/Footer",
      },
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = "http://localhost:3002/_next/";
    }

    return config;
  },
};
