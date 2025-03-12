const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController.js");
const { authenticateToken } = require("../middleware/authMiddleware.js");

// Obtener carrito del usuario autenticado
router.get("/", authenticateToken, cartController.getCartByUser);

// Agregar producto al carrito
router.post("/", authenticateToken, cartController.addToCart);

// Eliminar un producto del carrito por id_producto
router.delete("/item", authenticateToken, cartController.removeFromCartByUser);

// Vaciar el carrito del usuario autenticado
router.delete("/", authenticateToken, cartController.clearCart);

module.exports = router;
