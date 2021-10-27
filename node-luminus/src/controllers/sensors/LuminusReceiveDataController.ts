import { Request, Response } from "express";
import { LuminusRecieveDataService } from "../../services/sensors/LuminusRecieveDataService";

class LuminusReceiveDataController {
    async handle(request: Request, response: Response) {
        const { sensor_name, estado, corrente, tensao, potencia } = request.body;
        console.log("táaqui")
        const service = new LuminusRecieveDataService();

        const result = await service.execute(sensor_name, estado, corrente, tensao, potencia);

        return response.status(201).json(result);
    };
}

export { LuminusReceiveDataController }