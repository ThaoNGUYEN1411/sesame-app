import dotenv from "dotenv";
import app from "./config/app.js";

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`);
});
