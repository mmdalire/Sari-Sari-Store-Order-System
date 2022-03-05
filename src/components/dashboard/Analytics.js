import React, { useState, useContext, useEffect } from "react";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ErrorIcon from "@material-ui/icons/Error";
import Grid from "@material-ui/core/Grid";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

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

const Analytics = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();
	const [analytics, setAnalytics] = useState(null);

	useEffect(() => {
		const loadDashboard = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/dashboard/${auth.userId}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);
				setAnalytics(data);
			} catch (err) {}
		};

		loadDashboard();
	}, []);

	return (
		<div>
			<Typography
				variant="h5"
				style={{ fontWeight: "bold", paddingLeft: 15 }}
				color="primary"
			>
				Summary of the day
			</Typography>
			<Grid container className={classes.root}>
				{isLoading && <Loading />}
				{!isLoading && !analytics && (
					<EmptyContainer
						icon={<ErrorIcon fontSize="large" />}
						message="An error occured. Please try again!"
					/>
				)}
				{!isLoading && analytics && (
					<>
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
										{"totalPriceSold" in analytics
											? analytics.totalPriceSold.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
													}
											  )
											: "0.00"}
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
										{"totalCost" in analytics
											? analytics.totalCost.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
													}
											  )
											: "0.00"}
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
										{"totalProfit" in analytics
											? analytics.totalProfit.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
													}
											  )
											: "0.00"}
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
										{"totalProductSold" in analytics
											? analytics.totalProductSold.toLocaleString()
											: 0}
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
										{"totalProductReturned" in analytics
											? analytics.totalProductReturned.toLocaleString()
											: 0}
									</div>
									<AssignmentReturnIcon
										className={classes.icon}
										fontSize="large"
										color="primary"
									/>
								</CardContent>
							</Card>
						</Grid>
					</>
				)}
			</Grid>
		</div>
	);
};

export default Analytics;
