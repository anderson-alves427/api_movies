import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String},
    user: {type: String},
    email: {type: String},
    password: {type: String},
  }
);

const Usuarios = mongoose.model('usuarios', UsuarioSchema);

export default Usuarios;