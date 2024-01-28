"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		authenticateUser();
	}, []);

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	const authenticateUser = () => {
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			axios
				.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					const user = response.data;
					console.log("user", user);
					setIsLoggedIn(true);
					setIsLoading(false);
					setUser(user);
					if (user?.email === "admin@gmail.com") {
						return setAdmin(user);
					}
				})
				.catch((error) => {
					setIsLoggedIn(false);
					setIsLoading(false);
					setUser(null);
				});
		} else {
			setIsLoggedIn(false);
			setIsLoading(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	const logOutUser = () => {
		removeToken();
		authenticateUser();
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isLoading,
				user,
				setUser,
				storeToken,
				authenticateUser,
				logOutUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
