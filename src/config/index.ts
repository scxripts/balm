import './globals';
import env from './env';
import roots from './roots';
import paths from './paths';
import html from './html';
import styles from './styles';
import scripts from './scripts';
import extras from './extras';
import assets from './assets';
import server from './server';
import ftp from './ftp';
import pwa from './pwa';
import logs from './logs';

interface BalmVendor {
  key: string;
  value: string[];
}

enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4
}

const noop: Function = () => {};
const vendors: BalmVendor[] = [];

/**
 * Project type
 *
 * set `true` for a static HTML project
 * set `false` for a dynamic language project (e.g. PHP framework)
 */
const inFrontend = true;
const workspace: string = process.cwd();
const useDefaults = true; // Use balm default task

const config: any = {
  inFrontend,
  workspace,
  env,
  roots,
  paths,
  html,
  styles,
  scripts,
  extras,
  assets,
  server,
  ftp,
  pwa,
  logs,
  useDefaults
};

global.BalmJS = {};
BalmJS.config = config;
BalmJS.noop = noop;
BalmJS.LogLevel = LogLevel;
BalmJS.vendors = vendors;

export default config;
