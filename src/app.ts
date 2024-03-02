import express, { Express, Request, Response } from "express";

// init app express
const app: Express = express();

app.use(express.json());

export { app };
