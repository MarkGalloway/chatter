const koa = require('koa');
const koaRouter = require('koa-router');
const koaBody = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

const schema = require('./schema');

function App(context = {}, ...middlewares) {
  const app = new koa();

  middlewares.forEach(middleware => app.use(middleware));

  const router = new koaRouter();

  router.post(
    '/graphql',
    koaBody(),
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
