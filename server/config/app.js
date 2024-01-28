// import "../config/db";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "../src/routes/userRoute.js";

dotenv.config();

const { MONGODB_URI, FRONTEND_URL } = process.env;

const app = express();

app.use(express.json());

app.use(
	cors({
		credentials: true,
		origin: FRONTEND_URL,
	}),
);

mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`,
		);
	})
	.catch((err) => {
		console.error("Error connecting to mongo: ", err);
	});

app.use("/auth", userRoute);

export default app;
