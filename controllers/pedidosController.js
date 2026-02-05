// controllers/pedidosController.js
import BaseController from "./base/BaseController.js";
import PedidosService from "../services/pedidosService.js";

const service = new PedidosService();

class PedidosController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new PedidosController();
