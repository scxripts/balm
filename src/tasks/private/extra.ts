class ExtraTask extends BalmJS.BalmTask {
  constructor() {
    super('extra');

    const excludeGlobs: string[] = [];
    if (BalmJS.config.extras.excludes.length) {
      for (const filename of BalmJS.config.extras.excludes) {
        excludeGlobs.push(path.join(`!${BalmJS.config.src.base}`, filename));
      }
    }

    const defaultGlobs: string[] = [
      path.join(BalmJS.config.src.base, '*.*'), // All files but ignore all folders in the app root directory
      path.join(`!${BalmJS.config.src.base}`, '*.html'),
      path.join(`!${BalmJS.config.src.base}`, BalmJS.config.pwa.manifest),
      ...excludeGlobs
    ];

    this.defaultInput = defaultGlobs;
    this.defaultOutput = BalmJS.config.dest.base;
  }

  fn = (): any => {
    this.init();

    this.gulpSrcOptions = {
      dot: true
    };

    return this.src.pipe(gulp.dest(BalmJS.file.absPath(this.output)));
  };
}

export default ExtraTask;
