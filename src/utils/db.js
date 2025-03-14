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
      connectionString: process.env.DATABASE_URL,
      ssl: {
          require: true,
          rejectUnauthorized: false
      }, // SSL activado para Render
    });

if (!isTestEnv) {
  console.log('Conectando a la base de datos con la URL de conexión proporcionada.');
}

// Función para conectar a la base de datos
const connectDB = async () => {
  if (!pool) {
    console.log('⚠️ Conexión a la base de datos omitida en modo TEST.');
    return;
  }
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a la base de datos exitosa en Render');
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
