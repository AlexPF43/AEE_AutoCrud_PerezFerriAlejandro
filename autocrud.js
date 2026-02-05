// autocrud.js
import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersPath = "./controllers";
const controllersBasePath = "./controllers/base";
const routesPath = "./routes";
const servicesPath = "./services";

// Crear directorios necesarios
[controllersPath, controllersBasePath, routesPath, servicesPath].forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

// ---------- BASE CONTROLLER ----------
const baseControllerContent = `// controllers/base/BaseController.js
export default class BaseController {
    constructor(service) {
        this.service = service;
    }

    async getAll(req, res) {
        try {
            const data = await this.service.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const data = await this.service.findById(req.params.id);
            if (!data) return res.status(404).json({ message: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const data = await this.service.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const data = await this.service.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ message: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await this.service.delete(req.params.id);
            if (!result) return res.status(404).json({ message: "No encontrado" });
            res.json({ message: "Eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
`;
fs.writeFileSync(path.join(controllersBasePath, "BaseController.js"), baseControllerContent);

// Filtramos solo los modelos (sin incluir init-models.js)
const models = fs.readdirSync(modelsPath)
    .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
    const modelName = path.basename(modelFile, ".js"); // ejemplo: productos
    const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    const singularName = modelName.replace(/s$/, "");
    const serviceClassName = `${modelClass}Service`;
    const controllerClassName = `${modelClass}Controller`;

    // ---------- SERVICIO ----------
    const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";
import ${modelName} from "../models/${modelFile}";
import { DataTypes } from "sequelize";

// Inicializamos el modelo (opcional si ya se hizo en init-models)
const Model = ${modelName}.init(sequelize, DataTypes);

export default class ${serviceClassName} {
    async findAll() {
        return await Model.findAll();
    }

    async findById(id) {
        return await Model.findByPk(id);
    }

    async create(data) {
        return await Model.create(data);
    }

    async update(id, data) {
        const item = await Model.findByPk(id);
        if (item) {
            return await item.update(data);
        }
        return null;
    }

    async delete(id) {
        const item = await Model.findByPk(id);
        if (item) {
            await item.destroy();
            return true;
        }
        return false;
    }
}
`;
    fs.writeFileSync(path.join(servicesPath, `${modelName}Service.js`), serviceContent);

    // ---------- CONTROLADOR ESPECÍFICO ----------
    const controllerContent = `// controllers/${modelName}Controller.js
import BaseController from "./base/BaseController.js";
import ${serviceClassName} from "../services/${modelName}Service.js";

const service = new ${serviceClassName}();

class ${controllerClassName} extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new ${controllerClassName}();
`;
    fs.writeFileSync(path.join(controllersPath, `${modelName}Controller.js`), controllerContent);

    // ---------- RUTA ----------
    const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import controller from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", (req, res) => controller.getAll(req, res));
router.get("/:id", (req, res) => controller.getById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
`;
    fs.writeFileSync(path.join(routesPath, `${modelName}Routes.js`), routeContent);

    console.log(`✅ MVC generado para: ${modelName}`);
}

console.log("🎉 Estructura MVC generada correctamente.");
