import { server } from './mocks/server'; // Adjust the path as necessary

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());