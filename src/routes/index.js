import express from "express";
import auth from "./authRoute.js"

const routes = (app) => {

  app.use(
    express.json(),
    auth,
  )
}

export default routes;