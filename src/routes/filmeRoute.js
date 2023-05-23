import express from 'express';
import FilmeController from '../controller/filmeController.js';
import checkToken from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .get("/filme/lista", FilmeController.listaFilmes)
  .get("/filme/listaCurtidos", FilmeController.listaFilmesCurtidos)
  .post("/filme/:id_filme/curtida", checkToken, FilmeController.curtida)
  .delete("/filme/:id_filme/curtida", checkToken, FilmeController.removeCurtida)

export default router;   