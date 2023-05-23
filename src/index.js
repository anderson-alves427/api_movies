import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js";
import cors from 'cors';

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com banco de dados feita com sucesso')
})

const app = express();

app.use(cors());
app.use(express.json());
routes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Servidor ok')
})

export default app;

