class ZipTask extends BalmJS.BalmTask {
  constructor() {
    super('zip');

    this.defaultInput = `${BalmJS.config.dest.base}/**/*`;
    this.defaultOutput = '.';
  }

  recipe(
    input?: string | string[],
    output?: string,
    filename = 'archive.zip'
  ): void {
    this.init(input, output);

    this.src
      .pipe($.zip(filename))
      .pipe(gulp.dest(BalmJS.file.absPath(this.output)));
  }

  fn(cb: Function): void {
    cb();
  }
}

export default ZipTask;
