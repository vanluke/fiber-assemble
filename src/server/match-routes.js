import {matchRoutes} from 'react-router-config';
import routes from '../universal/routes';

const handleRoutes = render => ({
  req,
  res,
  stats,
}) => matchRoutes(routes, req.url)
  .map(() => {
    const context = {};
    const {content, styles} = render({req, context});
    return res.render('index', {
      title: 'Assemble', data: {}, content, styles, files: stats,
    });
  });

export default handleRoutes;
