import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import AvatarTemplate from "../shared/UI/AvatarTemplate";

const DUMMY_TOP_CUSTOMERS = [
	{
		_id: "6205dba347cec49ff87c46ae",
		ordersCount: 15,
		customer: {
			customerNo: "CRM202202-0002",
			firstName: "ADAM",
			lastName: "BERRY",
		},
	},
	{
		_id: "6205dbd147cec49ff87c46b1",
		ordersCount: 1,
		customer: {
			customerNo: "CRM202202-0003",
			firstName: "MAX",
			lastName: "CHURCHILL",
		},
	},
	{
		_id: "6205dbd147cec49ff87c46b1",
		ordersCount: 1,
		customer: {
			customerNo: "CRM202202-0003",
			firstName: "MAX",
			lastName: "CHURCHILL",
		},
	},
	{
		_id: "6205dbd147cec49ff87c46b1",
		ordersCount: 1,
		customer: {
			customerNo: "CRM202202-0003",
			firstName: "MAX",
			lastName: "CHURCHILL",
		},
	},
];

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
			<Grid item className={classes.grid} xs={12}>
				{DUMMY_TOP_CUSTOMERS.map((customer, index) => (
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
		</Grid>
	);
};

export default TopCustomers;
