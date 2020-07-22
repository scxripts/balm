import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { RuleSetRule } from '@balm/index';

// Style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

function cssLoader(): RuleSetRule {
  let styleLoader = 'style-loader';

  BalmJS.config.scripts.postcssLoaderOptions.plugins = BalmJS.plugins.postcss(); // TODO: isPostCSS?

  if (BalmJS.config.env.inSSR) {
    const loadersCount: number = BalmJS.config.scripts.loaders.length;
    for (let i = 0; i < loadersCount; i++) {
      if (
        (BalmJS.config.scripts.loaders[i] as { loader?: string }).loader ===
        'vue-loader'
      ) {
        styleLoader = 'vue-style-loader';
        break;
      }
    }
  }

  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use MiniCSSExtractPlugin to extract that CSS
  // to a file, but in development "style" loader enables hot editing
  // of CSS.
  // By default we support CSS Modules with the extension .module.css
  return {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: [
      BalmJS.config.env.isProd && BalmJS.config.scripts.extractCss.enabled
        ? MiniCssExtractPlugin.loader
        : styleLoader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: BalmJS.config.env.isProd && BalmJS.config.scripts.sourceMap
        }
      },
      {
        loader: 'postcss-loader',
        options: BalmJS.config.scripts.postcssLoaderOptions
      }
    ],
    // Don't consider CSS imports dead code even if the
    // containing package claims to have no side effects.
    // Remove this when webpack adds a warning or an error for this.
    // See https://github.com/webpack/webpack/issues/6571
    sideEffects: true
  };
}

export default cssLoader;
