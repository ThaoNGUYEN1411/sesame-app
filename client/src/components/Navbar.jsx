"use client";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
	const { isLoggedIn, logOutUser } = useContext(AuthContext);
	return (
		<nav>
			{/* !isLoggedIn && (
					<>
						<li>
							<Link href="/login">Login</Link>
						</li>
						<li>
							<Link href="/register">Signup</Link>
						</li>
					</>
				) */}
			{isLoggedIn && (
				<Link href="/" onClick={logOutUser} className="btn-logout">
					Logout
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
