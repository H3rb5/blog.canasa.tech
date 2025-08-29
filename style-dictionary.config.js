const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'assets/css/',
      files: [
        {
          destination: 'brand.css',
          format: 'css/variables'
        }
      ]
    }
  }
};
