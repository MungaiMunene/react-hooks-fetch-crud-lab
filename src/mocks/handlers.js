import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:4000/questions', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, prompt: 'lorem testum 1', answers: [] }]));
  }),
  // Add more handlers for other endpoints and methods (POST, DELETE, etc.)
];