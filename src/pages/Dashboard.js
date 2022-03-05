import React, { useContext } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Analytics from "../components/dashboard/Analytics";
import PageTitle from "../components/shared/UI/PageTitle";
import TopCustomers from "../components/dashboard/TopCustomers";
import TopProducts from "../components/dashboard/TopProducts";

const Dashboard = () => {
	return (
		<Container>
			<PageTitle title="Dashboard" />
			<Analytics />
			<Grid container>
				<TopCustomers />
				<TopProducts />
			</Grid>
		</Container>
	);
};

export default Dashboard;
