const path = require('path');
const isNext12 = (config) => !!config.module.rules.find((rule) => rule.oneOf);

const updateNextGreaterThan12Config = (config) => {
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);

  // Next 12 has multiple TS loaders, and we need to update all of them.
  const tsRules = oneOfRule.oneOf.filter(
    (rule) => rule.test && rule.test.toString().includes("tsx|ts")
  );

  tsRules.forEach((rule) => {
    // eslint-disable-next-line no-param-reassign
    rule.include = undefined;
  });

  return config;
};

const updateNextLessThan12Config = (config) => {
  // Next < 12 uses a single Babel loader.
  const tsRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes("tsx|ts")
  );

  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};

module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
  experimental: {
    outputStandalone: true,
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  webpack: config => {
    // const oneOfRules = config.module.rules.find(rule => 'oneOf' in rule).oneOf;
    
    // // Let Babel compile outside of src/.
    // for (const rule of oneOfRules) {
    //   if (!rule.test || !rule.test.toString().includes('tsx|ts')) continue;


    //   rule.include = undefined;
    //   rule.exclude = /node_modules/;
    // }

    // return config;

    if (isNext12(config)) {
      return updateNextGreaterThan12Config(config);
    }

    return updateNextLessThan12Config(config);
  }
};
