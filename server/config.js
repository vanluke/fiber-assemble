import convict from 'convict';
import path from 'path';

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  server: {
    buildPath: {
      doc: 'Build source location',
      format: '*',
      default: '',
    },
    bundlePath: {
      doc: 'Server bundle path',
      format: '*',
      default: '',
    },
    publicPath: {
      doc: 'Public path',
      format: '*',
      default: '',
    },
    regexp: {
      doc: 'Server regexp to get script tags',
      format: '*',
      default: '',
    },
  },
});

config.loadFile(path.join(__dirname, `server-config/${config.get('env')}.json`));
config.validate({allowed: 'strict'});

export default config;
