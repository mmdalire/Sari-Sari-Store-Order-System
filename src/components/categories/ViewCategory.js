import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import ViewCategoryInfo from "./ViewCategoryInfo";
import ViewProducts from "./ViewProducts";

const DUMMY_DATA = {
	code: "BIS",
	name: "BISCUIT",
	status: "IN-USE",
};

const DUMMY_PRODUCT_DATA = [
	{
		code: "PROD1",
		name: "PRODUCT1",
		quantity: 100,
	},
	{
		code: "PROD2",
		name: "PRODUCT2",
		quantity: 100,
	},
	{
		code: "PROD3",
		name: "PRODUCT3",
		quantity: 100,
	},
	{
		code: "PROD4",
		name: "PRODUCT4",
		quantity: 100,
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

const ViewCategory = (props) => {
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
					<ViewCategoryInfo data={DUMMY_DATA} />
				</CardContent>
			</Card>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Products who uses this category
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<ViewProducts data={DUMMY_PRODUCT_DATA} />
				</CardContent>
			</Card>
		</div>
	);
};

export default ViewCategory;
