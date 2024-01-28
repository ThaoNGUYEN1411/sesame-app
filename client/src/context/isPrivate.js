import { useContext } from "react";
import { AuthContext } from "./auth.context";

function IsPrivate(props) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		//isLoading = true
		return <h3>Loading ...</h3>;
	} else if (!isLoggedIn) {
		// isLoggedIn = false
		return <Navigate to="/login" />;
	} else {
		return props.children;
	}
}

export default IsPrivate;
