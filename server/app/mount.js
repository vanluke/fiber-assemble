import express from 'express';
import hot from '../../webpack/hotreload-middleware';

export default (ENV, app, buildPath) => {
  if (ENV !== 'production') {
    return hot.useWebpackMiddleware(app);
  }
  return app.use(express.static(buildPath));
};
