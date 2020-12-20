module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  plugins: [
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['pages', './src/pages'],
          ['components', './src/components'],
          ['img', './src/img'],
          ['cms', './src/cms'],
          ['locales', './src/locales'],
          ['templates', './src/templates'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-key': [
      'error',
      { checkFragmentShorthand: true },
    ],
    'react/no-array-index-key': 'error',
    'import/extensions': ['error', 'never', { packages: 'always' }],
    'linebreak-style': 0,
    'react/prefer-stateless-function': [0],
    'import/prefer-default-export': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [0],
    'react/jsx-max-props-per-line': [1, { when: 'always' }],
    'no-nested-ternary': [0],
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/label-has-for': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': 'error',
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-console': 'error',
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: true,
      },
    ],
    'template-curly-spacing': [2, 'always'],
    'import/no-unresolved': 2,
    'jsx-quotes': [2, 'prefer-single'],
    'react/sort-prop-types': [
      1,
      {
        callbacksLast: true,
        ignoreCase: true,
        requiredFirst: true,
        sortShapeProp: true,
        noSortAlphabetically: false,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
