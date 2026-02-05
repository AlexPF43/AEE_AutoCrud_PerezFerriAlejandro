// controllers/clientesController.js
import BaseController from "./base/BaseController.js";
import ClientesService from "../services/clientesService.js";

const service = new ClientesService();

class ClientesController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new ClientesController();
