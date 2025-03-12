const { Pool } = require('pg');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Verificar si estamos en modo de prueba
const isTestEnv = process.env.NODE_ENV === 'test';

// Configuración de conexión a la base de datos (Evita la conexión en pruebas)
const pool = isTestEnv
  ? null
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: false, // Cambia a true si necesitas conexión segura
    });

if (!isTestEnv) {
  console.log('Conectando a la base de datos con los siguientes valores:');
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_PORT:', process.env.DB_PORT);
}

// Función para conectar a la base de datos
const connectDB = async () => {
  if (!pool) {
    console.log('⚠️ Conexión a la base de datos omitida en modo TEST.');
    return;
  }
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a la base de datos exitosa');
    client.release();
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
    process.exit(1);
  }
};

// Cerrar conexión después de los tests
if (isTestEnv) {
  afterAll(async () => {
    if (pool) {
      await pool.end();
      console.log('🔌 Conexión a la base de datos cerrada después de las pruebas.');
    }
  });
}

module.exports = { connectDB, pool };
