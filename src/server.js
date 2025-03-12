const app = require('./app.js');
const { connectDB } = require('./utils/db.js');
const cron = require('node-cron');
const { cancelOldOrders } = require('./jobs/cancelOldOrders');

const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Programar la tarea para cancelar pedidos pendientes cada medianoche
cron.schedule('0 0 * * *', async () => {
    console.log('Ejecutando limpieza de pedidos pendientes...');
    await cancelOldOrders();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
