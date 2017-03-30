module.exports = function () {

  return {
    files: ['src/**/*.js', '!src/**/__tests__/*.js'],

    tests: ['__tests__/*.js','src/**/__tests__/*.js','src/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
}