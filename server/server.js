import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import app from './app/app';
import mount from './app/mount';
import config from './config';
import routes from './routes';

app.set('views', path.join(__dirname, '..', 'templates'));
app.set('view engine', 'pug');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const port = config.get('port');
const env = config.get('env');

routes(app);
mount(env, app, path.join(__dirname, 'build/public'));

app.listen(port, () => {
  console.log(`listening on ${port}`, new Date().toString());
});


export default app;
