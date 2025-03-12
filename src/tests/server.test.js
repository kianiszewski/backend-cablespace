const request = require('supertest');
const app = require('../app.js'); // Importa la configuración del servidor

describe('API Tests', () => {
  
  // Prueba de conexión al servidor
  test('Debe responder con un mensaje de bienvenida en /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'API de CABLES Y AUDIO funcionando correctamente');
  });

  // Prueba de obtener todos los productos
  test('Debe obtener todos los productos disponibles', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Prueba de error en ruta inexistente
  test('Debe devolver error 404 en una ruta inexistente', async () => {
    const res = await request(app).get('/ruta-invalida');
    expect(res.statusCode).toBe(404);
  });

});
