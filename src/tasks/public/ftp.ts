class FtpTask extends BalmJS.BalmTask {
  constructor() {
    super('ftp');

    this.defaultInput = BalmJS.config.ftp.files;
  }

  get options(): object {
    return Object.assign({}, BalmJS.config.ftp.options, this.customOptions);
  }

  recipe(localFiles: string | string[], customOptions?: object): void {
    this.init(localFiles, null, customOptions);

    this.src.pipe(BalmJS.plugins.sftp(this.options));
  }

  fn(cb: Function): void {
    cb();
  }
}

export default FtpTask;
