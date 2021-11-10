module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
  webpack: config => {
    const oneOfRules = config.module.rules.find(rule => 'oneOf' in rule).oneOf;
    
    // Let Babel compile outside of src/.
    for (const rule of oneOfRules) {
       if (!rule.text || !rule.test.toString().includes('tsx|ts')) continue;

      rule.include = undefined;
      rule.exclude = /node_modules/;
    }

    return config;
  }
};
