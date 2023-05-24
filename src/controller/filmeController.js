import FilmesService from "../service/filmeService.js";

const filmeService = new FilmesService();

class FilmeController {
    static async listaFilmes(req, res) {
        try {
            const filmes = await filmeService.listaFilmes();
            res.status(200).send(filmes);
        } catch (error) {
            res.send({ message: error.message});
        }
    }

    static async curtida(req, res) {
        const { id_filme } = req.params;
        try {
            const filmes = await filmeService.curtida(id_filme, req.headers.user.id);
            res.status(200).send(filmes);
        } catch (error) {
            res.status(500).send({ message: error.message});
        }
    }

    static async verificaFilmeCurtido(req, res) {
        const { id_filme } = req.params;
        try {
            const filmes = await filmeService.verificaFilmeCurtido(id_filme, req.headers.user.id);
            res.status(200).send(filmes);
        } catch (error) {
            res.status(500).send({ message: error.message});
        }
    }

    static async removeCurtida(req, res) {
        const { id_filme } = req.params;
        try {
            const response = await filmeService.removeCurtida(id_filme, req.headers.user.id);
            res.status(204).send(response);
        } catch (error) {
            res.status(500).send({ message: error.message});
        }
    }

    static async listaFilmesCurtidos(req, res) {
        try {
            const filmes = await filmeService.listaFilmesCurtidos();
            res.status(200).send(filmes);
        } catch (error) {
            res.send({ message: error.message});
        }
    }
    
}

export default FilmeController;