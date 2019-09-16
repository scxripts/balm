import del from 'del';
import { ASSETS_KEYS } from '../../config/constants';

function unique(arr: string[]): string[] {
  const obj: any = {};
  const result: string[] = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true;
      result.push(arr[i].replace(/\\/g, '/')); // NOTE: compatible with windows for `del@5.x`
    }
  }

  return result;
}

class CleanTask extends BalmJS.BalmTask {
  constructor() {
    super('clean');
  }

  getAssetsDir(rootKey = 'assets'): string[] {
    return ASSETS_KEYS.map(assetKey => BalmJS.config[rootKey][assetKey]);
  }

  get remoteRootDir(): string[] {
    return BalmJS.config.assets.root.trim().length
      ? [BalmJS.config.assets.root]
      : [];
  }

  get remoteAppDir(): string[] {
    return BalmJS.config.assets.subDir
      ? [BalmJS.config.assets.static]
      : this.getAssetsDir();
  }

  get dirInFrontend(): string[] {
    const isLocal = !path.isAbsolute(BalmJS.config.assets.root);

    if (BalmJS.config.logs.level === BalmJS.LogLevel.Debug) {
      BalmJS.logger.info(
        `<${this.name} task>`,
        `'${BalmJS.config.assets.root}' is local: ${isLocal}`
      );
    }

    return BalmJS.config.env.isProd
      ? [
          BalmJS.file.absPaths(BalmJS.config.roots.target),
          ...(isLocal ? this.remoteRootDir : this.remoteAppDir)
        ]
      : [BalmJS.file.absPaths(BalmJS.config.roots.tmp)];
  }

  get dirInBackend(): string[] {
    const buildDir = BalmJS.config.assets.subDir
      ? [BalmJS.config.dest.static]
      : [];

    return [
      ...(BalmJS.config.env.isProd && BalmJS.config.assets.subDir
        ? buildDir
        : this.getAssetsDir('to'))
    ];
  }

  fn = (cb: Function): void => {
    let directories = BalmJS.config.inFrontend
      ? this.dirInFrontend
      : this.dirInBackend;
    directories = unique(directories);

    if (BalmJS.config.logs.level === BalmJS.LogLevel.Debug) {
      BalmJS.logger.info(`<${this.name} task>`, {
        directories
      });
    }

    (async (): Promise<any> => {
      const deletedPaths: string[] = await del(directories, { force: true });

      BalmJS.logger.warn('<clean task>', {
        deletedPaths
      });
      cb();
    })();
  };
}

export = CleanTask;
