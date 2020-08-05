import path from 'path';
import { argv } from 'yargs';
import fs from 'fs';
import colors from 'ansi-colors';
import gulp from 'gulp';
import balm from './index';

const balmCwd = process.env.BALM_CWD || process.cwd();
const balmConfigFile = path.join(balmCwd, argv.config || 'balm.config.js');

function run() {
  gulp.parallel('balm:default')();
}

if (balmConfigFile && fs.existsSync(balmConfigFile)) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const balmConfig = require(balmConfigFile);

  if (typeof balmConfig === 'function') {
    let { config, beforeTask, afterTask, api } = balmConfig(balm);

    if (config) {
      balm.config = config;

      if (beforeTask) {
        balm.beforeTask = beforeTask;
      }
      if (afterTask) {
        balm.afterTask = afterTask;
      }

      api ? balm.go(api) : balm.go();
      run();
    } else {
      console.warn(
        colors.bgBlueBright('BalmJS'),
        colors.yellow('`config` is required')
      );
    }
  } else {
    balm.config = balmConfig || {};

    balm.go();
    run();
  }
} else {
  console.error(
    colors.bgBlueBright('BalmJS'),
    colors.yellow('`balm.config.js` not found :(')
  );
  process.exit(1);
}
