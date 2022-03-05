import { createContext } from "react";

export const AuthContext = createContext({
	token: "",
	userId: "",
	userFirstName: "",
	userLastName: "",
	currentId: "",
	logout: () => {},
});
