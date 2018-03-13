import request from 'supertest';

import App from '../app';

let server;

beforeAll(() => {
  const app = new App();
  server = app.callback();
});

it('Should say hello', async () => {
  const expectedValue = { data: { hello: 'Hello World.' } };

  const query = `
    query hello {
      hello
    }`;

  const response = await request(server)
    .post('/graphql')
    .send({ query });

  expect(response.body.errors).toBeUndefined();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(expectedValue);
  expect.assertions(3);
});
