module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/stepDefinitions/*.ts',
      'hooks/*.ts'
    ],
    requireModule: ['tsx/cjs'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    parallel: Number(process.env.PARALLEL) || 4,
    retry: 1
  },
  headed: {
    paths: ['features/**/*.feature'],
    require: [
      'features/stepDefinitions/*.ts',
      'hooks/*.ts'
    ],
    requireModule: ['tsx/cjs'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    parallel: 1,
    retry: 1
  }
};