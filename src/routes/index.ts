import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

// Mount route groups
router.use("/users", userRoutes);
// Add more routes as needed
// router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);

export default router;
