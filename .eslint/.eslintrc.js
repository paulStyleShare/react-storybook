module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
  // src 폴더에 적용되는 lint 설정
  overrides: [
    {
      files: ['src/**/*'],
      extends: [
        'eslint:recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      env: {
        es2020: true,
        browser: true,
        jest: true,
        node: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      plugins: ['simple-import-sort', 'sort-keys-fix'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'no-alert': 'off',

        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
            'ts-check': 'allow-with-description',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { ignoreRestSiblings: true },
        ],

        'jsx-a11y/anchor-is-valid': 'off',

        'simple-import-sort/sort': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages. 'react' related packages come first.
              ['^(react)$', '^(react-dom)$', '^@?\\w'],
              // Internal packages.
              ['^@styleshare', '^~'],
              // Relative imports. Put same-folder imports first and parent imports last.
              [
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
              ],
              // Style imports.
              ['^.+\\.s?css$'],
            ],
          },
        ],

        'sort-keys-fix/sort-keys-fix': [
          2,
          'asc',
          { caseSensitive: true, natural: true },
        ],

        'react/jsx-sort-default-props': [
          2,
          {
            ignoreCase: false,
          },
        ],
        'react/jsx-sort-props': [
          2,
          {
            callbacksLast: true,
            shorthandLast: true,
            ignoreCase: false,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
        'react/prop-types': 'off',
        'react/sort-prop-types': [
          2,
          {
            callbacksLast: true,
            ignoreCase: false,
            requiredFirst: true,
            sortShapeProp: true,
            noSortAlphabetically: false,
          },
        ],
      },
    },
  ],
};
