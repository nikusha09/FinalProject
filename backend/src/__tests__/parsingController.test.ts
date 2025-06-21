import request from 'supertest';
import express from 'express';
import parsingRoutes from '../routes/parsingRoutes';

const app = express();
app.use(express.json());
app.use('/api', parsingRoutes);

describe('POST /api/parse', () => {
  it('should parse valid recipe text', async () => {
    const response = await request(app).post('/api/parse').send({
      text: 'TITLE: Test\nING: 1 cup Sugar\nSTEP: Mix it'
    });
    expect(response.status).toBe(200);
    expect(response.body.recipes.length).toBe(1);
  });

  it('should return 400 if no text provided', async () => {
    const response = await request(app).post('/api/parse').send({});
    expect(response.status).toBe(400);
  });
});
