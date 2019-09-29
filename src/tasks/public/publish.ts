import { TemplateOption } from '../../config/types';

class PublishTask extends BalmJS.BalmTask {
  constructor() {
    super('publish');

    this.defaultInput = [
      `${BalmJS.config.dest.static}/**/*`, // Assets
      `!${BalmJS.config.dest.base}/*.*` // HTML
    ];
    this.defaultOutput = BalmJS.config.assets.static; // Remote dir
  }

  private _release(input: string, output: string, customOptions: object): void {
    if (input && output) {
      this.init(
        path.join(BalmJS.config.dest.base, input),
        path.join(BalmJS.config.assets.root, output), // Remote dir
        customOptions
      );
    } else {
      this.init();
    }

    this.src
      .pipe(BalmJS.plugins.rename(this.customOptions))
      .pipe(gulp.dest(this.output)); // Absolute path
  }

  recipe(
    input: string | TemplateOption[],
    output: string,
    renameOptions: object
  ): void {
    if (BalmJS.config.env.isProd) {
      if (BalmJS.utils.isArray(input)) {
        (input as TemplateOption[]).forEach((template: TemplateOption) => {
          this._release(template.input, template.output, template.options);
        });
      } else {
        this._release(input as string, output, renameOptions);
      }
    }
  }

  fn(cb: Function): void {
    cb();
  }
}

export default PublishTask;