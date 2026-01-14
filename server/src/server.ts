import app from './app';
import { env } from './config/env.config';

const PORT = env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} 🌐`);
});

// handle server errors
server.on('error', error => {
  if ('code' in error && error.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Please stop the running process or use a different port ⚠️`
    );
  } else {
    console.error('Failed to start the server ❌', error);
  }
  process.exit(1);
});
