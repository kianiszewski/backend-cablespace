const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar rutas
const authRoutes = require('./routes/authRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/ordersRoutes.js');
const orderDetailsRoutes = require('./routes/orderDetailsRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const shipmentRoutes = require('./routes/shipmentRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const priceHistoryRoutes = require('./routes/priceHistoryRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const favoritesRoutes = require('./routes/favoritesRoutes.js');
const offersRoutes = require('./routes/offersRoutes.js');
const purchasesRoutes = require('./routes/purchasesRoutes.js'); // ✅ Ruta de compras
const notificationsRoutes = require('./routes/notificationsRoutes'); // ruta notificaciones
const categoryRoutes = require('./routes/categoryRoutes.js');



// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Registrar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-details', orderDetailsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/price-history', priceHistoryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/purchases', purchasesRoutes); // ✅ Se mantiene la ruta
app.use('/api/notifications', notificationsRoutes); // uso ruta notificaciones
app.use('/api/categorias', categoryRoutes);

// Verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ message: 'API de CABLES Y AUDIO funcionando correctamente' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
