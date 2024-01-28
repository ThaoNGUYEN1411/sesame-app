import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
	username: { type: String },
	email: {
		type: String,
	},
	password: {
		type: String,
	},
});

const UserModel = model("User", userSchema);

export default UserModel;
