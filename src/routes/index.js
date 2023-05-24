import express from "express";
import auth from "./authRoute.js"
import filme from "./filmeRoute.js"

const routes = (app) => {

  app.use(
    express.json(),
    auth,
    filme,
  )
}

export default routes;