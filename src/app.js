const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

const schema = require('./schema');

function App(context = {}, ...middlewares) {
  const app = new Koa();

  middlewares.forEach(middleware => app.use(middleware));

  const router = new Router();

  router.post(
    '/graphql',
    bodyParser(),
    graphqlKoa(() => {
      return { schema, context };
    }),
  );
  router.get('/graphql', graphqlKoa({ schema }));
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

module.exports = App;
