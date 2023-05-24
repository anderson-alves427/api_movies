import axios from "axios";
import Curtidas from "../models/Curtida.js";
import * as dotenv from 'dotenv';
dotenv.config();

class FimeService {
    async listaFilmes() {
        try {
            const response = await axios.get(`${process.env.URL_IMDB}AdvancedSearch/${process.env.API_KEY_IMDB}?https://imdb-api.com/API/AdvancedSearch/k_tgmlbis7?title_type=feature&countries=br&sort=release_date,desc`);

            if (response.data.errorMessage) {
                throw new Error(response.data.errorMessage);
            }
            return response.data.results.slice(0, 10);
        } catch (error) {
            console.log('Erro na listagem de filmes imdb', error);
            throw new Error('Erro ao listar filmes na api do imdb');
        }
    }

    async curtida(id_filme, usuario) {
        try {
           const filmeImdb = await this.listaFilmesPorIdImdbApi(id_filme);
           if (!filmeImdb.id) {
                throw new Error('Filme não existe no catálogo do Imdb');
           }
           const filmeCurtido = await Curtidas.find({'id_movie_imdb': id_filme, 'id_user': usuario}, {});
            if (filmeCurtido.length) {
                throw new Error('Filme já curtido.');
            }

            const curtida = new Curtidas({
                title: filmeImdb.title,
                plot: filmeImdb.plot,
                image: filmeImdb.image,
                id_movie_imdb: id_filme,
                id_user: usuario,
           });
           curtida.save();

            return curtida;
        } catch (error) {
            console.log('Erro na listagem de filmes por id no imdb', error);
            const newError = new Error(error.message);
            newError.stack = error.stack;
            throw newError;
        }
    }

    async verificaFilmeCurtido(id_filme, usuario) {
        try {
            const filmeCurtido = await Curtidas.find({'id_movie_imdb': id_filme, 'id_user': usuario}, {});
            if(!filmeCurtido.length) {
                return false;
            }
            return true;
        } catch (error) {
            console.log('Erro na listagem de filmes', error);
            const newError = new Error(error);
            newError.stack = error.stack;
            throw newError;
        }
    }

    async removeCurtida(id_filme, usuario) {
        try {
           const filmeImdb = await this.listaFilmesPorIdImdbApi(id_filme);
           if (!filmeImdb.id) {
            throw new Error('Filme não existe no catálogo do Imdb');
           }

           const filmeCurtido = await Curtidas.find({'id_movie_imdb': id_filme, 'id_user': usuario}, {});
           
            if (!filmeCurtido.length) {
                throw new Error('Filme nunca foi curtido.');
            }

            await Curtidas.findByIdAndDelete(filmeCurtido[0]._id);
            return {
                message: "Filme descurtido com sucesso."
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async listaFilmesPorIdImdbApi(id) {
        try {
            const response = await axios.get(`https://imdb-api.com/pt-BR/API/Title/${process.env.API_KEY_IMDB}/${id}`); 

            if (response.data.errorMessage) {
                throw new Error(response.data.errorMessage);
            }

            return response.data;   
        } catch (error) {
            console.log('Erro na listagem de filmes por id no imdb', error);
            const newError = new Error(error.message);
            newError.stack = error.stack;
            throw newError;
        }
    }

    async listaFilmesCurtidos() {
        try {
            const listaFilmes = await Curtidas.aggregate([
                {
                  $group: {
                    _id: '$id_movie_imdb',
                    count: { $sum: 1 },
                    title: { $addToSet: '$title' },
                    plot: { $addToSet: '$plot' },
                    image: { $addToSet: '$image' },
                  }
                }
              ]);
              
              return listaFilmes;
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao listar filmes curtidos');
        }
    }

}

export default FimeService;