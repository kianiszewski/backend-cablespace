const { pool } = require('../utils/db.js');

const cancelOldOrders = async () => {
    try {
        console.log("Ejecutando limpieza de pedidos pendientes...");

        // Buscar pedidos en estado "pendiente" con más de 3 días
        const result = await pool.query(`
            SELECT id_pedido FROM pedidos
            WHERE estado = 'pendiente'
            AND fecha_pedido < NOW() - INTERVAL '3 days'
        `);

        for (const row of result.rows) {
            const id_pedido = row.id_pedido;

            // Obtener los detalles del pedido antes de eliminarlo
            const details = await pool.query(
                'SELECT id_producto, cantidad FROM detalle_pedido WHERE id_pedido = $1',
                [id_pedido]
            );

            // Si hay detalles, restaurar el stock antes de eliminar
            for (const detail of details.rows) {
                await pool.query(
                    'UPDATE productos SET stock = stock + $1 WHERE id_producto = $2',
                    [detail.cantidad, detail.id_producto]
                );
            }

            // Actualizar el estado del pedido a "cancelado"
            await pool.query(
                'UPDATE pedidos SET estado = $1 WHERE id_pedido = $2',
                ['cancelado', id_pedido]
            );

            // Verificar si los detalles aún existen antes de eliminarlos
            const remainingDetails = await pool.query(
                'SELECT id_detalle FROM detalle_pedido WHERE id_pedido = $1',
                [id_pedido]
            );

            if (remainingDetails.rowCount > 0) {
                await pool.query(
                    'DELETE FROM detalle_pedido WHERE id_pedido = $1',
                    [id_pedido]
                );
            }

            console.log(`Pedido ${id_pedido} ha sido cancelado automáticamente y el stock ha sido restaurado.`);
        }
    } catch (error) {
        console.error('Error cancelando pedidos antiguos:', error);
    }
};

module.exports = { cancelOldOrders };
