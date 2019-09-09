class WatchTask extends BalmJS.StyleTask {
  constructor() {
    super('watch');
  }

  recipe(handler: Function): void {
    handler('Hello BalmJS');
  }

  fn(cb: Function): void {
    console.log('watch task');
    cb();
  }
}

export = WatchTask;
