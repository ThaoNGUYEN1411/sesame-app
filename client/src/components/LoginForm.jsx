"use client";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
	const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);
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
		window.sessionStorage.setItem("notice", "Account created");

		axios
			.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, requestBody)
			.then((response) => {
				const jwt = response.data.authToken;
				storeToken(jwt);
				authenticateUser();
				router.push("/articles");
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
			<h1 className="title">Log in to your account</h1>
			<Link href="/register" className="sub-title">
				Don't have an account? <span>Sign up</span>
			</Link>

			{error ? <h3> {error} </h3> : ""}
			<form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
				<button className="register-btn">Login</button>
				{/* {error && <div className="error-message">{error}</div>} */}

				{/* <Link className="login-link" href={"/"}>
						Already have an account? <span className="underline">Login</span>
					</Link> */}
			</form>
		</div>
	);
};

export default LoginForm;
