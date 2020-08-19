module.exports = {
  extends: ['.eslintrc.js'],
  overrides: [
    {
      files: ['src/**/*'],
      rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/no-unused-prop-types': 'warn',
        'react/no-unused-state': 'warn',
      },
    },
  ],
};
