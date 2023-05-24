import bcrypt from 'bcryptjs';
import  jsonwebtoken  from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();
import Usuarios from "../models/Usuario.js";

class AuthService {
    async login(dto) {
        const usuario = await Usuarios.findOne({'user': dto.usuario}, {});
        if (!usuario) {
            throw new Error('Usuario não cadastrado')
        }

        const senhaIguais = await bcrypt.compare(dto.senha, usuario.password)
        .then(res => res)
        .catch(error => error);

        if (!senhaIguais) {
            throw new Error('Usuario ou senha inválido')
        }
        
        const accessToken = jsonwebtoken.sign({
            id: usuario._id,
            usuario: usuario.user
        }, process.env.SECRET, {
            expiresIn: 8640000
        })
    
        const dadosRetorno = {
            accessToken: accessToken,
            nome: usuario.name,
            id: usuario._id
        }
        return dadosRetorno; 
    }
}

export default AuthService;