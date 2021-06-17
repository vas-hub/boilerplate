const {
  resolve
} = require('path');


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/lib/**",
    "!**/vendor/**"
  ],
  moduleNameMapper: {
    '^@appName/(.*)$': resolve(__dirname, '../../packages/$1/src'),
  },
};