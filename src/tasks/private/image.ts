class ImageTask extends BalmJS.BalmImageTask {
  constructor() {
    super('image');

    const excludeGlobs = [];
    for (const imageFolder of BalmJS.config.styles.sprites) {
      excludeGlobs.push(`!${BalmJS.config.src.img}/${imageFolder}`);
      excludeGlobs.push(`!${BalmJS.config.src.img}/${imageFolder}/*.png`);
    }

    this.defaultInput = [`${BalmJS.config.src.img}/**/*`, ...excludeGlobs];
  }

  fn = (): any => {
    this.init();

    return gulp
      .src(BalmJS.file.absPaths(this.input), {
        since: gulp.lastRun(BalmJS.toNamespace('image') as string)
      })
      .pipe($.imagemin())
      .pipe(gulp.dest(BalmJS.file.absPath(this.output)));
  };
}

export default ImageTask;
