module.exports = {
  globalSetup: './global-jest-setup.ts',
  roots: ['../__TESTS__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  bail: true,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  setupFiles: ['dotenv/config'],
  maxWorkers: 4,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [],
      },
    },
  },
  reporters: [
    'default',
    [
      '../node_modules/jest-html-reporter',
      {
        pageTitle: 'Shopping lists test suites',
        sort: 'titleAsc',
        outputPath: 'coverage/test-report.html',
      },
    ],
  ],
};
