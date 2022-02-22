import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@material-ui/core";
import { blue, amber } from "@material-ui/core/colors";

import MainNavigation from "./components/shared/navigation/MainNavigation";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
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
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<MainNavigation>
					<Routes>
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
					</Routes>
				</MainNavigation>
			</Router>
		</ThemeProvider>
	);
};

export default App;
