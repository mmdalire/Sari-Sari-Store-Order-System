import React, { useState, useEffect, useContext } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import AvatarTemplate from "../shared/UI/AvatarTemplate";
import EmptyContainer from "../shared/UI/EmptyContainer";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		cardTitle: {
			fontWeight: "bold",
		},
		grid: {
			padding: theme.spacing(1),
		},
		card: {
			marginBottom: theme.spacing(1),
		},
		cardHeader: {
			padding: theme.spacing(2, 3),
		},
		cardContent: {
			display: "flex",
		},
	};
});

const TopCustomers = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();
	const [topCustomers, setTopCustomers] = useState(null);

	useEffect(() => {
		const loadDashboard = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/dashboard/${auth.userId}/customers`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);
				setTopCustomers(data);
			} catch (err) {}
		};

		loadDashboard();
	}, []);

	return (
		<Grid item className={classes.grid} xs={6}>
			<Grid item className={classes.grid} xs={12}>
				<Typography
					variant="h5"
					style={{ fontWeight: "bold" }}
					color="primary"
				>
					Top Customers
				</Typography>
			</Grid>
			{isLoading && <Loading />}
			{!isLoading && !topCustomers && (
				<EmptyContainer
					icon={<ErrorIcon fontSize="large" />}
					message={
						httpErrors || "An error occured. Please try again!"
					}
				/>
			)}
			{!isLoading && topCustomers && topCustomers.length === 0 && (
				<EmptyContainer message="There are no customers yet!" />
			)}
			{!isLoading && topCustomers && (
				<Grid item className={classes.grid} xs={12}>
					{topCustomers.map((customer, index) => (
						<Card
							className={classes.card}
							key={customer.customer.customerNo}
						>
							<CardContent className={classes.cardContent}>
								<Typography
									variant="h3"
									color="primary"
									style={{
										width: 50,
										marginRight: 20,
										textAlign: "center",
									}}
								>
									{String(index + 1).padStart(2, "0")}
								</Typography>
								<AvatarTemplate data={customer.customer} />
								<div style={{ width: "100%", marginLeft: 20 }}>
									<Typography
										variant="h5"
										style={{ fontWeight: "bold" }}
									>
										{`${customer.customer.lastName}, ${customer.customer.firstName}`}
									</Typography>
									<Typography>{`${customer.ordersCount} ${
										customer.ordersCount > 1
											? "orders"
											: "order"
									}`}</Typography>
								</div>
							</CardContent>
						</Card>
					))}
				</Grid>
			)}
		</Grid>
	);
};

export default TopCustomers;
