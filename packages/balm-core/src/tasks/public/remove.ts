import del from 'del';

class RemoveTask extends BalmJS.BalmTask {
  constructor() {
    super('remove');
  }

  getFiles(input: string | string[]): string | string[] {
    let files: string | string[] = BalmJS.file.absPaths(input);
    // NOTE: compatible with windows for `del@5.x`
    files = BalmJS.utils.isArray(input)
      ? (files as string[]).map((file: string) => file.replace(/\\/g, '/'))
      : (files as string).replace(/\\/g, '/');

    return files;
  }

  recipe(input: string | string[]): any {
    return async (callback: Function): Promise<any> => {
      const canDel = !!(
        (BalmJS.utils.isString(input) && (input as string).trim()) ||
        (BalmJS.utils.isArray(input) && input.length)
      );

      if (canDel) {
        const files = this.getFiles(input);

        BalmJS.logger.debug(
          `${this.name} task`,
          {
            files
          },
          {
            pre: true
          }
        );

        const deletedPaths: string[] = await del(files, { force: true });

        BalmJS.logger.warn(
          `${this.name} task`,
          {
            deletedPaths
          },
          {
            pre: true
          }
        );
      } else {
        BalmJS.logger.error(`${this.name} task`, 'Invalid input');
      }

      callback();
    };
  }

  fn(callback: Function): void {
    callback();
  }
}

export default RemoveTask;
