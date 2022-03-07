import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import ViewCategoryInfo from "./ViewCategoryInfo";
import ViewProducts from "./ViewProducts";

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

const ViewCategory = () => {
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
					<ViewCategoryInfo />
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
					<ViewProducts />
				</CardContent>
			</Card>
		</div>
	);
};

export default ViewCategory;
