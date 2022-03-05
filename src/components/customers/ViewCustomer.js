import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import ViewCustomerInfo from "./ViewCustomerInfo";
import ViewCustomerCredit from "./ViewCustomerCredit";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
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
			marginTop: -25,
		},
	};
});

const ViewCustomer = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Primary Information
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<ViewCustomerInfo />
				</CardContent>
			</Card>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Credit Information
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<ViewCustomerCredit />
				</CardContent>
			</Card>
		</div>
	);
};

export default ViewCustomer;
