import { Request, Response } from "express";
import { LoginUserService } from "../../services/users/LoginUserService";

class LoginUserController {
    async handle(request: Request, response: Response) {
        
        const { email, pass } = request.body;
        const service = new LoginUserService();

        try {
            if(!email || !pass) {
                response.json({ Error: "Campos incompletos" });
            }

            if (pass.length < 6) {
                response.json({ Error: "Senha com menos de 6 caracteres"});
            }

            const token = await service.execute(email, pass);

            return response.json(token);

        } catch (err) {
            return response.json({ Error: err.message }).redirect("/");
        }

    };
}

export { LoginUserController }