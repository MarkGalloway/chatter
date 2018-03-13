import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import schema from './schema';

function App(context = {}, ...middlewares: any[]) {
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

export default App;
