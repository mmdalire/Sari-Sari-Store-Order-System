import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import ViewCustomerInfo from "./ViewCustomerInfo";
import ViewCustomerCredit from "./ViewCustomerCredit";

const DUMMY_DATA = {
	customerNo: "CRM202202-0001",
	lastName: "TEST1",
	firstName: "TEST1L",
	middleInitial: "A",
	phoneNumber: "11112223333",
	email: "email@email.com",
	address: "Some address at this address",
	birthDate: "2021-12-12",
	status: "ACTIVE",
};

const DUMMY_ORDER_DATA = [
	{
		poNo: "PONO202202-0001",
		credit: 100,
		createdDate: "2022-02-18T15:49:04.781Z",
	},
	{
		poNo: "PONO202202-0002",
		credit: 120,
		createdDate: "2022-02-18T15:49:04.781Z",
	},
	{
		poNo: "PONO202202-0003",
		credit: 130,
		createdDate: "2022-02-18T15:49:04.781Z",
	},
	{
		poNo: "PONO202202-0004",
		credit: 50,
		createdDate: "2022-02-18T15:49:04.781Z",
	},
];

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

const ViewCustomer = (props) => {
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
					<ViewCustomerInfo data={DUMMY_DATA} />
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
