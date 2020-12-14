"use strict";

module.exports = function(api) {
  const env = api.env();

  const includeCoverage = process.env.BABEL_COVERAGE === "true";

  const envOptsNoTargets = {
    loose: true,
    modules: false,
    exclude: ["transform-typeof-symbol"],
  };
  const envOpts = Object.assign({}, envOptsNoTargets);

  let convertESM = true;
  let ignoreLib = true;
  let includeRuntime = false;
  const nodeVersion = "6.9";

  switch (env) {
    // Configs used during bundling builds.
    case "asx-parser":
      convertESM = false;
      ignoreLib = false;
      envOpts.targets = {
        node: nodeVersion,
      };
      break;
    case "standalone":
      convertESM = false;
      ignoreLib = false;
      includeRuntime = true;
      break;
    case "production":
      // Config during builds before publish.
      envOpts.targets = {
        node: nodeVersion,
      };
      break;
    case "development":
      envOpts.debug = true;
      envOpts.targets = {
        node: "current",
      };
      break;
    case "test":
      envOpts.targets = {
        node: "current",
      };
      break;
  }

  const config = {
    // Our dependencies are all standard CommonJS, along with all sorts of
    // other random files in Babel's codebase, so we use script as the default,
    // and then mark actual modules as modules farther down.
    sourceType: "unambiguous",
    comments: false,
    ignore: [
      // These may not be strictly necessary with the newly-limited scope of
      // babelrc searching, but including them for now because we had them
      // in our .babelignore before.
      "packages/*/test/fixtures",
      ignoreLib ? "packages/*/lib" : null,
      "packages/babel-standalone/babel.js",
      "packages/babel-preset-env-standalone/babel-preset-env.js",
    ].filter(Boolean),
    presets: [["@babel/env", envOpts]],
    plugins: [
      // TODO: Use @babel/preset-flow when
      // https://github.com/babel/babel/issues/7233 is fixed
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/proposal-class-properties", { loose: true }],
      "@babel/proposal-export-namespace-from",
      "@babel/proposal-numeric-separator",
      [
        "@babel/proposal-object-rest-spread",
        { useBuiltIns: true, loose: true },
      ],

      // Explicitly use the lazy version of CommonJS modules.
      convertESM ? ["@babel/transform-modules-commonjs", { lazy: true }] : null,
    ].filter(Boolean),
    overrides: [
      {
        test: "packages/babel-parser",
        plugins: [
          "babel-plugin-transform-charcodes",
          ["@babel/transform-for-of", { assumeArray: true }],
        ],
      },
      {
        test: "./packages/babel-register",
        plugins: [
          // Override the root options to disable lazy imports for babel-register
          // because otherwise the require hook will try to lazy-import things
          // leading to dependency cycles.
          convertESM ? "@babel/transform-modules-commonjs" : null,
        ].filter(Boolean),
      },
      {
        test: "./packages/babel-polyfill",
        presets: [["@babel/env", envOptsNoTargets]],
        plugins: [["@babel/transform-modules-commonjs", { lazy: false }]],
      },
      {
        // The vast majority of our src files are modules, but we use
        // unambiguous to keep things simple until we get around to renaming
        // the modules to be more easily distinguished from CommonJS
        test: [
          "packages/*/src",
          "packages/*/test",
          "codemods/*/src",
          "codemods/*/test",
        ],
        sourceType: "unambiguous",
      },
      {
        // The runtime transform shouldn't process its own runtime or core-js.
        exclude: [
          "packages/babel-runtime",
          /[\\/]node_modules[\\/](?:@babel\/runtime|babel-runtime|core-js)[\\/]/,
        ],
        plugins: [
          includeRuntime
            ? ["@babel/transform-runtime", { version: "7.4.4" }]
            : null,
        ].filter(Boolean),
      },
    ].filter(Boolean),
  };

  // we need to do this as long as we do not test everything from source
  if (includeCoverage) {
    config.auxiliaryCommentBefore = "istanbul ignore next";
    config.plugins.push("babel-plugin-istanbul");
  }

  return config;
};
