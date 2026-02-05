// controllers/logController.js
import BaseController from "./base/BaseController.js";
import LogService from "../services/logService.js";

const service = new LogService();

class LogController extends BaseController {
    constructor() {
        super(service);
    }
    // Aquí puedes sobrescribir métodos si es necesario
}

export default new LogController();
