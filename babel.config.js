module.exports = module.exports = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3, modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'babel-plugin-styled-components',
      { ssr: false, displayName: true, pure: true },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@loadable/babel-plugin',
  ];

  return { presets, plugins };
};
