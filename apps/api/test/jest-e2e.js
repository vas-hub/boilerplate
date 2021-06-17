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
    '^@appName/(.*)$': resolve(__dirname, '../../../packages/$1/src'),
  },
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  }
};
