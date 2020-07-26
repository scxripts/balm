import fs from 'fs';
import colors from 'ansi-colors';
import {
  BALM_CORE_PACKAGE_NAME,
  localModule,
  npmGlobalModule,
  yarnGlobalModule
} from './config';

let balmCore;

if (process.env.BALM_CORE) {
  balmCore = process.env.BALM_CORE;
} else if (fs.existsSync(localModule)) {
  balmCore = localModule;
} else if (fs.existsSync(npmGlobalModule)) {
  balmCore = npmGlobalModule;
} else if (fs.existsSync(yarnGlobalModule)) {
  balmCore = yarnGlobalModule;
} else {
  console.error(
    colors.bgBlueBright('<BalmJS>'),
    colors.yellow(`\`${BALM_CORE_PACKAGE_NAME}\` module not found :(`)
  );
  process.exit(1);
}

export default balmCore;