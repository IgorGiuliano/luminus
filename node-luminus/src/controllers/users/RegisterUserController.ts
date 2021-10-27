import { Request, Response } from "express";
import { RegisterUserService } from "../../services/users/RegisterUserService";

class RegisterUserController {
    async handle(request: Request, response: Response) {

        const { name, email, pass, passConfirmation } = request.body;
        const service = new RegisterUserService();

        try {
            if (!name || !email || !pass || !passConfirmation) {
                return response.json({ Error: "Campos incompletos!" });
            }

            if (pass != passConfirmation) {
                return response.json({ Error: "As senhas não são iguais" });
            }

            if (pass.length < 6) {
                return response.json({ Error: "Senha com menos de 6 caracteres" });
            }

            const user = await service.execute(name, email, pass);

            return response.json(user);
        } catch(err) {
            return response.json({ Error: err.message });
        }
        
    }

};


export { RegisterUserController }