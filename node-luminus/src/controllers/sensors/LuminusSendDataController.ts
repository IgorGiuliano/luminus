import { Request, Response } from "express";
import { LuminusSendDataService } from "../../services/sensors/LuminusSendDataService";

class LuminusSendDataController {
    async handle(request: Request, response: Response) {
        const { sensor_name, ...other } = request.body;
        const service = new LuminusSendDataService();

        const result = await service.execute(sensor_name);

        if(result.estado === 1) {
            return response.status(201).send("on");
        } else if (result.estado === 0){
            return response.status(201).send("off");
        }

    };
}

export { LuminusSendDataController }