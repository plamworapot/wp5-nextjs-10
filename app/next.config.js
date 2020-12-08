const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: "app",
      library: { type: config.output.libraryTarget, name: "app" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        // For SSR, resolve to disk path (or you can use code streaming if you have access)
        app_header: isServer
          ? path.resolve(
              __dirname,
              "../app_header/.next/server/static/runtime/remoteEntry.js"
            )
          : "app_header", // for client, treat it as a global
        app_footer: isServer
          ? path.resolve(
              __dirname,
              "../app_footer/.next/server/static/runtime/remoteEntry.js"
            )
          : "app_footer", // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    if (!isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
    }

    config.plugins.push(new MergeRuntime());

    return config;
  },
};
