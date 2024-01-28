"use client";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
	const { isLoggedIn, logOutUser } = useContext(AuthContext);
	return (
		<nav>
			<ul>
				{!isLoggedIn && (
					<>
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/register">Signup</Link>
						</li>
					</>
				)}
				{isLoggedIn && (
					<li>
						<Link href="/" onClick={logOutUser}>
							Logout
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
