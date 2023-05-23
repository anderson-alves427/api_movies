import mongoose from "mongoose";

const CurtidaSchema = new mongoose.Schema(
  {
    id: {type: String},
    id_movie_imdb: {type: String},
    id_user: {type: String},
    title: {type: String},
    plot: {type: String},
    image: {type: String},
  }
);

const Curtidas = mongoose.model('curtidas', CurtidaSchema);

export default Curtidas;