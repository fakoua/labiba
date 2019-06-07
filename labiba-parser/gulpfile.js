"use strict";
const gulp = require("gulp");
const fancyLog = require("fancy-log");
const chalk = require("chalk");
const rollup = require("rollup");
const rollupReplace = require("rollup-plugin-replace");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const path = require("path");

const bundles = ["./"];

function buildRollup(packages) {
    return Promise.all(
      packages.map(pkg => {
        const input = getIndexFromPackage(pkg);
        fancyLog(`Compiling '${chalk.cyan(input)}' with rollup ...`);
        return rollup
          .rollup({
            input,
            plugins: [
              rollupReplace({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
              }),
              rollupBabel({
                envName: "asx-parser",
              }),
              rollupNodeResolve(),
            ],
          })
          .then(bundle => {
            return bundle.write({
              file: path.join(pkg, "lib/index.js"),
              format: "cjs",
              name: "asx-parser",
              sourcemap: process.env.NODE_ENV !== "production",
            });
          });
      })
    );
  }

  function getIndexFromPackage(name) {
    return `${name}/src/index.js`;
  }
  
gulp.task("build", () => buildRollup(bundles));
// gulp.task("build-babel", () => buildBabel(/* exclude */ bundles));