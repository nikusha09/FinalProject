import request from 'supertest';
import express from 'express';
import batchRoutes from '../routes/batchRoutes';

const app = express();
app.use(express.json());
app.use('/api', batchRoutes);

describe('Batch API', () => {
  it('should create a new batch', async () => {
    const response = await request(app).post('/api/batches').send({
      batchName: 'Test Batch',
      recipes: []
    });
    expect(response.status).toBe(201);
    expect(response.body.batch.batchName).toBe('Test Batch');
  });

  it('should list batches', async () => {
    const response = await request(app).get('/api/batches');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a batch by name', async () => {
    await request(app).post('/api/batches').send({
      batchName: 'Special Batch',
      recipes: []
    });
    const response = await request(app).get('/api/batches/Special Batch');
    expect(response.status).toBe(200);
    expect(response.body.batchName).toBe('Special Batch');
  });

  it('should delete a batch by name', async () => {
    await request(app).post('/api/batches').send({
      batchName: 'Delete Me',
      recipes: []
    });
    const response = await request(app).delete('/api/batches/Delete Me');
    expect(response.status).toBe(200);
  });
});
