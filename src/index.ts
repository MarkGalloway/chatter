import App from './app';
import { DATABASE_URL, HOST, PORT } from './config';
import Database from './db';

const context = {};

const app = App(context);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
