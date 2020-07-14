import webpackMiddleware from './webpack';
import httpProxyMiddleware from './proxy';
import historyMiddleware from './history';

function getMiddlewares(): object[] {
  const canOverride = BalmJS.config.server.middlewares.every(
    (middleware) =>
      BalmJS.utils.isFunction(middleware) || BalmJS.utils.isObject(middleware)
  );

  if (!canOverride) {
    BalmJS.logger.error(
      'server middleware',
      'server middleware must be a function (`function (req, res, next) {}`) or object (`{ route: "/api", handle: function (req, res, next) {} }`)'
    );
  }

  return [
    ...webpackMiddleware(),
    ...httpProxyMiddleware(),
    ...historyMiddleware(),
    ...(canOverride ? BalmJS.config.server.middlewares : [])
  ];
}

export default getMiddlewares;