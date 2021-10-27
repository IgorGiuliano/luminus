import prismaClient from '../../prisma'

class LuminusRecieveDataService {
    async execute(sensor_name: string, estado: number,
         corrente: number, tensao: number, potencia: number) 
    {
        const sensor_exist = await prismaClient.sensor.findFirst({
            where: {
                sensor_name: sensor_name
            }
        });

        if(!sensor_exist) {
            throw new Error("O sensor não foi cadastrado");
        }

        const data = await prismaClient.data_collected.create({
            data: {
                sensor_name: sensor_name,
                estado,
                corrente,
                tensao,
                potencia
            },
            include: {
                sensor: true
            }
        })

        console.log(data);
        return data;
    };
}

export { LuminusRecieveDataService }