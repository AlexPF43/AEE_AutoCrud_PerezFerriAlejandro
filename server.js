import express from "express";
import productoRoutes from "./routes/productoRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { sequelize } from "./config/db.js";
import initModels from "./models/init-models.js";


const app = express();
app.use(express.json());

// Inicializamos los modelos una sola vez
const models = initModels(sequelize);
app.locals.models = models;
// Rutas
app.use("/productos", productoRoutes);
app.use("/log", logRoutes);
// Sincronizar base de datos
(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Tablas sincronizadas.");
    } catch (error) {
        console.error("❌ Error al sincronizar las tablas:", error);
    }
})();
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor correindo en http://localhost:${PORT}`));