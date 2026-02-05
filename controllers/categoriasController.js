// controllers/categoriasController.js
import BaseController from "./base/BaseController.js";
import CategoriasService from "../services/categoriasService.js";

const service = new CategoriasService();

class CategoriasController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new CategoriasController();
