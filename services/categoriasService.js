// services/categoriasService.js
import { sequelize } from "../config/db.js";
import categorias from "../models/categorias.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo (opcional si ya se hizo en init-models)
const Model = categorias.init(sequelize, DataTypes);

export default class CategoriasService {
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
