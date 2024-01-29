"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
	} = useForm();
	const router = useRouter();
	const [error, setError] = useState("");

	const onSubmit = async (values) => {
		console.log(values);
		const requestBody = values;
		// créer un message de confirmation
		// window.sessionStorage permet de stocker des chaînes de caractères dans un navigateur
		// window.sessionStorage.setItem("notice", "Account created");

		axios
			.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, requestBody)
			.then((response) => {
				console.log("response.data", response.data);
				router.push("/login");
			})
			.catch((error) => {
				console.log("error", error);
				setError(error.response.data.message);
			});
	};

	// observateur de la saisie
	useEffect(() => {
		// const observer = watch((values) => console.log(values));
		const observer = watch((values) => null);

		return () => observer.unsubscribe();
	}, [watch]);

	return (
		<div className="login-bloc">
			<h1 className="title">Create your accountn</h1>
			<Link href="/" className="sub-title">
				Have an account? <span>Log in now</span>
			</Link>

			{error ? <h4 className="error-message"> {error} </h4> : ""}
			<form onSubmit={handleSubmit(onSubmit)} className="login-form">
				<input
					type="username"
					placeholder="Full Name"
					{...register("username", { required: "Full Name is required" })}
				/>
				<small>{errors.email?.message}</small>
				<input
					placeholder="Email"
					type="email"
					{...register("email", { required: "Email is required" })}
				/>
				<small>{errors.email?.message}</small>
				<input
					type="password"
					{...register("password", { required: "Password is required" })}
					placeholder="Password"
				/>
				<small>{errors.password?.message}</small>
				<button className="register-btn">Register</button>
			</form>
		</div>
	);
};

export default RegisterForm;
