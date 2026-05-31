import config from './src/config/config';
import app from './app';

const port = config.port;

const server = app.listen(port, () => console.info('Running on port: ', port));
server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code == 'EADDRINUSE') {
    console.error(`Port: ${port} is already in use`);
  } else console.error('Internal Error');
});
