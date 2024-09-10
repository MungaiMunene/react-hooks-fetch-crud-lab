// test-utils.js
import { server } from './mocks/server'; // Adjust path to your mock server

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());