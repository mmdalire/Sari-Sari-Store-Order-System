import React, { useState, useCallback, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, amber } from "@material-ui/core/colors";

import { AuthContext } from "./context/auth-context";

import MainNavigation from "./components/shared/navigation/MainNavigation";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import PurchaseReturns from "./pages/PurchaseReturns";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: amber,
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);

	const login = useCallback((token, userId) => {
		setUserId(userId);
		localStorage.setItem("userData", JSON.stringify({ userId, token }));

		setIsLoggedIn(true);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);

		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));

		if (userData && userData.token) {
			login(userData.token, userData.userId);
		}
	}, [login]);

	let routes;

	//Redirect to login page if the user is NOT logged in
	if (!isLoggedIn) {
		routes = <Login onLogin={login} />;
	}
	//Redirect to dashboard if the user is logged in
	else {
		routes = (
			<Router>
				<MainNavigation>
					<Routes>
						<Route path="/" element={<Dashboard />} exact />
						<Route
							path="/dashboard"
							element={<Dashboard />}
							exact
						/>
						<Route
							path="/customers"
							element={<Customers />}
							exact
						/>
						<Route
							path="/inventory"
							element={<Inventory />}
							exact
						/>
						<Route path="/orders" element={<Orders />} exact />
						<Route
							path="/categories"
							element={<Categories />}
							exact
						/>
						<Route path="/products" element={<Products />} exact />
						<Route
							path="/purchase_returns"
							element={<PurchaseReturns />}
							exact
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</MainNavigation>
			</Router>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<AuthContext.Provider value={{ userId, logout }}>
				{routes}
			</AuthContext.Provider>
		</ThemeProvider>
	);
};

export default App;
