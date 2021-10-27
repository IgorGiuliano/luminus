import prismaClient from "../../prisma"

class RegisterSensorService {
    async execute(dados: string, cod: string) {
        const exist = await prismaClient.sensor.findFirst({
            where: {
                sensor_name: dados
            }
        });

        if(exist) {
            throw new Error('Sensor já cadastrado');
        }
        
        const sensor = await prismaClient.sensor.create({
            data: {
                sensor_name: dados,
                user_cod: cod
            }, 
            include: {
                user: true
            }
        });

        return sensor;
    }
}

export { RegisterSensorService }