import AuthService from "../service/authService.js";

const authService = new AuthService();

class AuthController {
    static async login(req, res) {
        const { usuario, senha } = req.body;
        try {
            const login = await authService.login({usuario, senha});
            res.status(200).send(login);
        } catch (error) {
            res.send({ message: error.message});
        }

    }
}

export default AuthController;