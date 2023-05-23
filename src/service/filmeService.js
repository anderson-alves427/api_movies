import axios from "axios";
import Curtidas from "../models/Curtida.js";
import * as dotenv from 'dotenv';
dotenv.config();

class FimeService {
    async listaFilmes() {
        try {
            const response = await axios.get(`${process.env.URL_IMDB}AdvancedSearch/${process.env.API_KEY_IMDB}?title_type=feature&countries=br&sort=release_date,desc`);
            return response.data.results.slice(0, 10);
        } catch (error) {
            console.log('Errona listagem de filmes imdb', error);
            throw new Error('Erro ao listar filmes na api do imdb');
        }
    }

    async curtida(id_filme, usuario) {
        try {
           const filmeImdb = await this.listaFilmesPorIdImdbApi(id_filme);
           if (!filmeImdb.id) {
                throw new Error('Filme não existe no catálogo do Imdb');
           }

           const filmeCurtido = await Curtidas.findOne({'id_movie_imdb': id_filme, 'id_user': usuario}, {});

            if (filmeCurtido) {
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
            throw new Error(error);
        }
    }

    async removeCurtida(id_filme, usuario) {
        try {
           const filmeImdb = await this.listaFilmesPorIdImdbApi(id_filme);
           if (!filmeImdb.id) {
            throw new Error('Filme não existe no catálogo do Imdb');
           }

           const filmeCurtido = await Curtidas.findOne({'id_filme_imdb': id_filme, 'id_usuario': usuario}, {});

            if (!filmeCurtido) {
                throw new Error('Filme nunca foi curtido.');
            }

            await Curtidas.findByIdAndDelete(filmeCurtido._id);
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
            return response.data;   
        } catch (error) {
            console.log('Erro na listagem de filmes por id no imdb', error);
            throw new Error('Erro ao listar filmes por id na api do imdb');
        }
    }

    async listaFilmesCurtidos() {
        try {
            const listaFilmes = await Curtidas.aggregate([
                {
                $group: {
                    _id: '$id_filme_imdb',
                    count: { $sum: 1 },
                }
                }
            ]);""
            const dadosFilmes = listaFilmes.map(filme => this.listaFilmesPorIdImdbApi(filme._id));
            return await Promise.all(dadosFilmes);;
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao listar filmes curtidos');
        }
    }

}

export default FimeService;