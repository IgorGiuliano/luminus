import { Router }                   from "express";
import { LuminusReceiveDataController } from "./controllers/sensors/LuminusReceiveDataController";
import { LuminusSendDataController } from "./controllers/sensors/LuminusSendDataController";
import { LoginUserController }      from "./controllers/users/LoginUserController";
import { RegisterSensorController } from "./controllers/users/RegisterSensorController";
import { RegisterUserController }   from "./controllers/users/RegisterUserController";
import { ensureAuthenticated } from "./middleware/ensureAutheticated";

const router = Router();

//  Rotas user
router.post('/authenticate', new LoginUserController().handle);
router.post('/register', new RegisterUserController().handle);
router.post('/set-sensor', ensureAuthenticated, new RegisterSensorController().handle);

// Rotas sensor
router.post('/luminus-api-recieve-data', new LuminusReceiveDataController().handle);
router.get('/luminus-api-send-data', new LuminusSendDataController().handle);

export { router };