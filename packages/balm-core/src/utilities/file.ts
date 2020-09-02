import fs from 'fs';
import getPublicUrlOrPath from './public-url';
import { PUBLIC_URL } from '../config/constants';

// Make sure any symlinks in the project folder are resolved
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath);

class File {
  get publicUrlOrPath(): string {
    // We use `PUBLIC_URL` environment variable or "homepage" field to infer
    // "public path" at which the app is served.
    // webpack needs to know it to put the right <script> hrefs into HTML even in
    // single-page apps that may serve index.html for nested URLs like /todos/42.
    // We can't use a relative path in HTML because we don't want to load something
    // like /todos/42/static/js/bundle.7289d.js. We have to know the root.
    return getPublicUrlOrPath(
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(resolveApp('package.json')).homepage,
      process.env.PUBLIC_URL
    );
  }

  get stylePaths(): string[] {
    return [
      path.resolve(BalmJS.config.workspace, '.'),
      path.resolve(BalmJS.config.workspace, 'node_modules'),
      ...BalmJS.config.styles.atImportPaths
    ];
  }

  get assetsSuffixPath(): string {
    return !BalmJS.config.inFrontend &&
      BalmJS.config.env.isProd &&
      BalmJS.config.assets.cache // Back-end project in production with cache
      ? path.join(BalmJS.config.assets.subDir, BalmJS.config.assets.buildDir)
      : BalmJS.config.assets.subDir;
  }

  get defaultEntry(): string {
    return path.join(BalmJS.config.src.js, 'index.js');
  }

  absPath(_path: string): string {
    return path.resolve(BalmJS.config.workspace, _path);
  }

  absPaths(_paths: string | string[]): string | string[] {
    let paths: string | string[];

    if (BalmJS.utils.isArray(_paths)) {
      paths = [];
      for (const _path of _paths) {
        const result: RegExpExecArray = /^!(.+)$/.exec(
          _path
        ) as RegExpExecArray;
        if (result) {
          paths.push('!' + this.absPath(result[1]));
        } else {
          paths.push(this.absPath(_path));
        }
      }
    } else {
      paths = this.absPath(_paths as string);
    }

    return paths;
  }

  matchAllFiles(_path: string, _file?: string): string {
    return path.join(_path, '**', _file || '*');
  }

  assetsPath(_path: string): string {
    return BalmJS.config.env.isProd || !BalmJS.config.inFrontend
      ? path.posix.join(
          BalmJS.config.assets.virtualDir,
          this.assetsSuffixPath,
          _path
        )
      : _path;
  }

  setPublicPath(): any {
    const publicPathSrc = `${PUBLIC_URL}/`;
    const publicPathDest: string = BalmJS.config.inDesktopApp
      ? `.${this.publicUrlOrPath}`
      : this.publicUrlOrPath;

    BalmJS.logger.debug(
      `set public path`,
      {
        regex: publicPathSrc,
        replacement: publicPathDest
      },
      {
        pre: true
      }
    );

    return BalmJS.plugins.replace(publicPathSrc, publicPathDest);
  }
}

export default new File();
