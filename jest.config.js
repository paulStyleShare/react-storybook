const { compilerOptions } = require('./tsconfig');

function toPathKey(key) {
  return '^' + key.replace('*', '(.*)');
}
function toModulePath(val) {
  return '<rootDir>/src/' + val.replace('*', '$1');
}

function pathsToNameMapper(paths) {
  return Object.keys(paths).reduce((acc, key) => {
    acc[toPathKey(key)] = toModulePath(paths[key][0]);

    return acc;
  }, {});
}

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToNameMapper(compilerOptions.paths),
};
