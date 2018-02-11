const App = require('./app');
const { PORT, HOST } = require('./config');

const app = new App();

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
