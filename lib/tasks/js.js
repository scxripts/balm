import { webpackConfig, webpackErrorHandling } from '../webpack.config';

class Js extends Task {
  constructor(entry = '', output = '') {
    super('js');

    let defaultOutput = config.production
      ? path.join(config.roots.target, config.paths.target.js)
      : path.join(config.roots.tmp, config.paths.tmp.js);

    this.input = entry;
    this.output = output || defaultOutput;
  }

  get fn() {
    return callback => {
      webpack(webpackConfig(this.input, this.output), (err, stats) => {
        webpackErrorHandling(err, stats);
        callback();
      });
    };
  }
}

export default Js;