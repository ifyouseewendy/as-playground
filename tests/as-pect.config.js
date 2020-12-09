module.exports = {
    include: ["**/*.spec.ts"],
    add: ["**/*.include.ts"],
    flags: {
        "--runtime": ["stub"],
        "--lib": ["node_modules","src"]
    },
    disclude: [/node_modules/],
    imports(memory, createImports, instantiateSync, binary) {
      let result; // Imports can reference this

      const myImports = {
        shopify: require("./test-shopify.js")
      };
      result = instantiateSync(binary, createImports(myImports));
      // return the entire result object from the loader
      return result;
    },
    performance: {
        enabled: false,
        maxSamples: 10000,
        maxTestRunTime: 5000,
        reportMedian: true,
        reportAverage: true,
        reportStandardDeviation: false,
        reportMax: false,
        reportMin: false,
    },
    wasi: {
      args: [],
      env: process.env,
      preopens: {},
      returnOnExit: false,
    },
    outputBinary: false,
};
