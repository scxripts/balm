import balm from './balm';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..', '..');
const workspace = path.join(projectRoot, 'test-workspace');

balm.config = {
  workspace,
  styles: {
    extname: 'scss'
  }
};

balm.go(mix => {
  if (mix.env.isProd) {
    console.log('prod');

    // mix.remove('dist');
    // mix.css();
    // mix.url();
    // mix.js();
    // mix.html();
    // mix.copy('src/images/**/*', 'dist/img');
    // mix.copy('src/fonts/**/*', 'dist/font');
    // mix.copy('src/media/*', 'dist/media');
    // mix.version(['dist/**/*', '!dist/manifest.json']);
  } else {
    console.log('dev');

    // mix.remove('.tmp');
    // mix.css();
    // mix.js();
    // mix.jsmin(['.tmp/js/main.js', '.tmp/js/modernizr.js'], '.test/js');
    // mix.html();
    // mix.modernizr();
    // mix.serve((watcher, reload) => {
    // watcher.on('change', file => {
    // console.log('changed', file);
    // mix.ftp(file, {
    //   ftpOptions: {
    //     host: '',
    //     username: '',
    //     password: '',
    //     remotePath: '/var/www/ftp-test'
    //   },
    //   gulpSrcOptions: {
    //     base: '.'
    //   }
    // });
    // mix.sass(file, '.test/css', {
    //   gulpSrcOptions: {
    //     base: 'src/www/sass'
    //   }
    // });
    // let exname = file.split('.')[1];
    // if (exname === 'css') {
    //   mix.css(file, '.tmp/css');
    // }
    // if (exname === 'js') {
    //   mix.js(`./${file}`, '.tmp/js');
    //   reload();
    // }
    // });
    // });
  }
});
