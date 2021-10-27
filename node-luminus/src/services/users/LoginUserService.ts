import prismaClient from "../../prisma";
import bcrypt       from 'bcrypt';
import { sign } from "jsonwebtoken";

interface IUserResponse {
    name: string,
    email: string,
}

class LoginUserService {
    async execute(email: string, pass: string) {
        
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if (!user) {
            throw new Error('O usuário não foi cadastrado');
        }

        if (!(await bcrypt.compare(pass, user.pass))) {
            throw new Error('Usuário ou senhas incorretas');
            
        }

        const token = sign(
            {user: {
                name: user.nome
            }},
            process.env.JWT_SECRET,
            {
                subject: user.cod_user,
                expiresIn: "30s"
            }
        );

        return { token, user: { name: user.nome, email: user.email } };
    };
}

export { LoginUserService }