import React from "react";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

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
			marginTop: -25,
		},
		analytics: {
			marginTop: -25,
			display: "flex",
		},
		analyticsContent: {
			padding: theme.spacing(1),
			width: "100%",
			textAlign: "right",
			fontSize: 30,
			fontWeight: "bold",
		},
		icon: {
			fontSize: 40,
			border: `3px solid ${blue[500]}`,
			borderRadius: "50px",
			padding: 10,
			marginLeft: 10,
		},
	};
});

const DUMMY_ANALYTICS = {
	totalPriceSold: 30,
	totalCost: 40,
	totalProfit: 610,
	totalProductSold: 1,
	totalProductReturned: 0,
};

const Analytics = () => {
	const classes = useStyles();

	return (
		<div>
			<Typography
				variant="h5"
				style={{ fontWeight: "bold" }}
				color="primary"
			>
				Summary of the day
			</Typography>
			<Grid container className={classes.root}>
				<Grid item className={classes.grid} xs={4}>
					<Card className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography
									variant="h6"
									className={classes.cardTitle}
									color="primary"
								>
									Total Price Earned
								</Typography>
							}
						/>
						<CardContent className={classes.analytics}>
							<div className={classes.analyticsContent}>
								{DUMMY_ANALYTICS.totalPriceSold.toLocaleString(
									undefined,
									{ minimumFractionDigits: 2 }
								)}
							</div>
							<LocalOfferIcon
								className={classes.icon}
								fontSize="large"
								color="primary"
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<Card className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography
									variant="h6"
									className={classes.cardTitle}
									color="primary"
								>
									Total Cost Spend
								</Typography>
							}
						/>
						<CardContent className={classes.analytics}>
							<div className={classes.analyticsContent}>
								{DUMMY_ANALYTICS.totalCost.toLocaleString(
									undefined,
									{ minimumFractionDigits: 2 }
								)}
							</div>
							<MoneyOffIcon
								className={classes.icon}
								fontSize="large"
								color="primary"
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<Card className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography
									variant="h6"
									className={classes.cardTitle}
									color="primary"
								>
									Total Profit Earned
								</Typography>
							}
						/>
						<CardContent className={classes.analytics}>
							<div className={classes.analyticsContent}>
								{DUMMY_ANALYTICS.totalProfit.toLocaleString(
									undefined,
									{ minimumFractionDigits: 2 }
								)}
							</div>
							<MonetizationOnIcon
								className={classes.icon}
								fontSize="large"
								color="primary"
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<Card className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography
									variant="h6"
									className={classes.cardTitle}
									color="primary"
								>
									Products Sold
								</Typography>
							}
						/>
						<CardContent className={classes.analytics}>
							<div className={classes.analyticsContent}>
								{DUMMY_ANALYTICS.totalProductSold.toLocaleString()}
							</div>
							<ShoppingBasketIcon
								className={classes.icon}
								fontSize="large"
								color="primary"
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<Card className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography
									variant="h6"
									className={classes.cardTitle}
									color="primary"
								>
									Products Returned
								</Typography>
							}
						/>
						<CardContent className={classes.analytics}>
							<div className={classes.analyticsContent}>
								{DUMMY_ANALYTICS.totalProductReturned.toLocaleString()}
							</div>
							<AssignmentReturnIcon
								className={classes.icon}
								fontSize="large"
								color="primary"
							/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
};

export default Analytics;
