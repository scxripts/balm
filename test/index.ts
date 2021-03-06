import './utilities';
import './tasks';
import './middlewares';
import './bundler';
import './bootstrap/config_check.spec';
import './bootstrap/index.spec';
import './app';

const balmConfigDefaults = Object.assign({}, {
  env: {
    isProd: false,
    isDev: false,
    inSSR: false,
    isMP: false,
    inDesktopApp: false
  },
  inFrontend: true,
  paths: {
    target: {
      css: 'css',
      js: 'js',
      img: 'img',
      font: 'font',
      media: 'media'
    }
  },
  styles: {
    extname: 'css',
    sprites: []
  },
  scripts: {
    entry: '',
    library: '',
    libraryTarget: 'var',
    loaders: [],
    target: 'web',
    externals: false,
    inject: false,
    extractAllVendors: false,
    bundleAnalyzerReport: false,
    extractCss: {
      enabled: false
    },
    esbuild: false
  },
  extras: {
    includes: [],
    excludes: []
  },
  assets: {
    publicUrl: '',
    root: path.join(balm.config.workspace, 'assets'),
    subDir: '',
    buildDir: 'build',
    cache: false,
    includes: [],
    excludes: []
  },
  server: {
    proxyConfig: false,
    historyOptions: false
  },
  pwa: {
    enabled: false
  },
  logs: {
    level: 3
  }
});

afterEach(function () {
  balm.config = balmConfigDefaults;
  balm.reset();
});
