import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";

dotenv.config();

const saltRounds = 10;
const { TOKEN_SECRET } = process.env;

/* Signup */
export const signup = (req, res, next) => {
	const { email, password, username } = req.body;

	// Condition 1:fill well
	if (email === "" || password === "") {
		res.status(400).json({ message: "Provide email and password" });
		return;
	}

	// Condition 2 : Email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: "Provide a valid email address" });
	}

	// Condition 3: password
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!passwordRegex.test(password)) {
		res.status(400).json({
			message:
				"Le mot de passe doit comporter au moins 6 caractères et inclure au moins un chiffre, une lettre minuscule et une lettre majuscule",
		});
		return;
	}

	// Condition 4 : new email
	UserModel.findOne({ email })
		.then((foundUser) => {
			if (foundUser) {
				res.status(400).json({ message: "Utilisateur déjà existant" });
			}
			// hash password
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);

			//condition => create new user
			return UserModel.create({
				email: email,
				password: hashedPassword,
				username: username,
			});
		})
		.then((createdUser) => {
			const { email, password, username } = createdUser;
			const user = { email, password, username };
			res.status(200).json({ user: user });
		})
		.catch((error) => {
			console.log("Error creating new user... ", error);
			res.status(500).json({ message: "Error creating new user" });
		});
};

/* Login */
export const login = (req, res, next) => {
	const { email, password } = req.body;

	if (email === "" || password === "") {
		res.status(400).json({ message: "Provide email and password" });
		return;
	}

	UserModel.findOne({ email })
		.then((foundUser) => {
			if (!foundUser) {
				res.status(401).json({ message: "Utilisateur non trouvé" });
				return;
			}

			const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

			if (passwordCorrect) {
				const { _id, email, username } = foundUser;
				const payload = { _id, email, username };

				const authToken = jwt.sign(payload, TOKEN_SECRET, {
					algorithm: "HS256",
					expiresIn: "6h",
				});
				// Send the token to the client upon successful login
				res.status(200).json({ authToken: authToken });
			} else {
				res.status(400).json({ message: "Le mot de passe n'est pas correct" });
			}
		})
		.catch((error) =>
			res.status(500).json({ message: `Error login : ${error}` }),
		);
};

/* Verify auth */
export const verify = (req, res, next) => {
	res.status(200).json(req.payloadAfterVerifyByExpressjwt);
};
