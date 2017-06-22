import path from 'path';

const root = path.resolve(__dirname, '..');
const workspace = path.join(root, 'test-workspace');
const assets = path.join(workspace, 'assets');

const testConfig = {
  root: root,
  workspace: workspace,
  assets: assets
};

const balmConfig = {
  production: true,
  // Server config
  // server: {
  //   open: false,
  //   browser: 'PhantomJS'
  // },
  workspace: testConfig.workspace,
  roots: {
    source: 'app',
    target: 'dist'
  },
  paths: {
    source: {
      css: 'styles',
      js: 'scripts',
      img: 'images',
      font: 'fonts'
    },
    target: {
      css: 'css',
      js: 'js',
      img: 'img',
      font: 'font'
    }
  },
  html: {
    publicUrl: 'http://balmjs.com'
  },
  styles: {
    ext: 'css',
    autoprefixer: ['> 1%', 'last 2 versions', 'Firefox ESR']
  },
  scripts: {
    entry: {
      // Vendors custom config
      // 'mylib': ['jquery', 'lodash'],
      // 'page-a': './app/scripts/page-a.js',
      // 'page-b': './app/scripts/page-b.js',
      main: './app/scripts/main.js'
    },
    // Vendor all in one
    // vendor: true,
    eslint: true
  },
  sprites: {
    image: ['img-icon'],
    svg: ['svg-icon']
  },
  cache: true,
  assets: {
    root: testConfig.assets,
    publicPath: 'public',
    subDir: 'web'
    // Extra cache files
    // includes: [
    //   'dist/web/css/vendor.css',
    //   'dist/web/js/vendors/jquery.js',
    //   'dist/web/js/vendors/lodash.js'
    // ],
    // excludes: [
    //   'dist/web/js/main.js'
    // ]
  }
};

export default balmConfig;
