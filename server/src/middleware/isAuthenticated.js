import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
dotenv.config();

// expressjwt check an HTTP request sent to the server contains a valid JWT
// and allows to access the information in the JWT after it has been authenticated.
const isAuthenticated = expressjwt({
	secret: process.env.TOKEN_SECRET,
	algorithms: ["HS256"],
	requestProperty: "payloadAfterVerifyByExpressjwt",
	getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		const token = req.headers.authorization.split(" ")[1];
		return token;
	}
	return null;
}

export default isAuthenticated;
