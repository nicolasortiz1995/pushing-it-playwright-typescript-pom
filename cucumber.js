module.exports = {
  default: `--require-module ts-node/register \
              --require ./playwright/step-definitions/**/*.ts \
              --format progress \
              --format json:./reports/json/cucumber-report.json \
              ./playwright/features/**/*.feature`
};