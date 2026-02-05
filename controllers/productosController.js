// controllers/productosController.js
import BaseController from "./base/BaseController.js";
import ProductosService from "../services/productosService.js";

const service = new ProductosService();

class ProductosController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new ProductosController();
