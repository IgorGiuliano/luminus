import prismaClient from "../../prisma"

class LuminusSendDataService {
    async execute(sensor_name: string) {

        const result = await prismaClient.data_collected.findFirst({
            where: {
                sensor_name: sensor_name,
            },
            orderBy: {
                created_at: "desc"
            }
        })
        

        return result;
    };
}

export { LuminusSendDataService }