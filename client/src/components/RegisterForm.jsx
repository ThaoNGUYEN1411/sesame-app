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
		//???? gui tt cho back nhu the nao de recuperer reponse?

		// créer un message de confirmation
		// window.sessionStorage permet de stocker des chaînes de caractères dans un navigateur
		window.sessionStorage.setItem("notice", "Account created");

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
			{error ? <h3> {error} </h3> : ""}
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
				{/* <input type="submit" className="register-btn" /> */}
				{/* {error && <div className="error-message">{error}</div>} */}

				{/* <Link className="login-link" href={"/"}> */}
				{/* Already have an account? <span className="underline">Login</span> */}
				{/* </Link> */}
			</form>
		</div>
	);
};

export default RegisterForm;
