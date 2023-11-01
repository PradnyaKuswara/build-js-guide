import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { Authentication } from "./validations/AccessValidation.js";

import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());
// app.use(multer().none());

app.use('/assets/images/',express.static('public/images'));

app.use(AuthRoute);
app.use('/users', Authentication, UserRoute);



app.get("/", (req, res) => {
  res.send(`Base URL: ${baseUrl}`);
});


app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...')
});