import { Request, Response } from "express";
import { RegisterSensorService } from "../../services/users/RegisterSensorService";

class RegisterSensorController {
    async handle(request: Request, response: Response) {
        const { sensor_name } = request.body;
        const { cod_user } = request;

        try {
            const service = new  RegisterSensorService();
    
            const result = await service.execute(sensor_name, cod_user);
            return response.json({result});
            
        } catch (err) {
            return response.json({ Error: err.message });
        }

    }
}

export { RegisterSensorController };