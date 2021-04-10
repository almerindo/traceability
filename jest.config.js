module.exports = {

  collectCoverage: true,
  coverageDirectory: "coverage",


  // An array of file extensions your modules use
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  testEnvironment: "node",
  testRegex: [
    "\\.test\\.ts"
  ],
  transform: {
      "^.+\\.ts$": "ts-jest"
  },
};
