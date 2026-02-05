// controllers/detalles_pedidoController.js
import BaseController from "./base/BaseController.js";
import Detalles_pedidoService from "../services/detalles_pedidoService.js";

const service = new Detalles_pedidoService();

class Detalles_pedidoController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new Detalles_pedidoController();
