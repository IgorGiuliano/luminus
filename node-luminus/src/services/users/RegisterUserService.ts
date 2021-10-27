import prismaClient from "../../prisma";
import bcrypt from 'bcrypt';

class RegisterUserService {
    async execute(nome: string, email: string, pass: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pass, salt);
            
            const User = await prismaClient.user.create({
                data: {
                    nome,
                    email,
                    pass: hash
                }
            });

            return User;

        } else {

            throw new Error(`O email ${email}, já está sendo utilizado`);

        }
    };
}

export { RegisterUserService }