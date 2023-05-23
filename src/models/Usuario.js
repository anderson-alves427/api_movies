import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String},
    usuario: {type: String},
    email: {type: String},
    senha: {type: String},
  }
);

const usuarios = mongoose.model('usuarios', UsuarioSchema);

export default usuarios;