import App from './app';
import { HOST, PORT } from './config';

const app = App();

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
