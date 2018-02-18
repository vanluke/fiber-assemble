import path from 'path';
import {readStats} from '../middleware';
import router from '../app/router';
import {matchRoutes, render} from '../../src/server';

const routesHandler = matchRoutes(render);

export default (app) => {
  app.use('/api/v0', router);

  app.get('/', (req, res, next) => {
    const stats = readStats(path.join(__dirname, '..', 'metadata/stats.json'));
    return routesHandler({
      req,
      res,
      next,
      stats,
    });
  });
};
