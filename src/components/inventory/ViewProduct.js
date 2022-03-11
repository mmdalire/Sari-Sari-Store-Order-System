import React, { useState, useEffect, useContext } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import ViewOrders from "./ViewOrders";
import ViewPurchaseReturns from "./ViewPurchaseReturns";

import EmptyContainer from "../shared/UI/EmptyContainer";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

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
		textField: {
			width: "100%",
			backgroundColor: "white",
		},
	};
});

const ViewProduct = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);
	const [tabValue, setTabValue] = useState(0); //Open ORDERS (0) by default

	useEffect(() => {
		const loadProductInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/inventory/${auth.currentId}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setViewData(data);
			} catch (err) {}
		};

		loadProductInfo();
	}, []);

	const handleTabChange = (e, newTab) => {
		setTabValue(newTab);
	};

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Product Information
						</Typography>
					}
				/>
				{isLoading && <Loading />}
				{!isLoading && httpErrors && (
					<EmptyContainer
						message={
							httpErrors ||
							"Something went wrong. Please try again later."
						}
					/>
				)}
				{!isLoading && !httpErrors && viewData && (
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={2}>
								<TextField
									value={viewData.code}
									size="small"
									className={classes.textField}
									id="product-code"
									label="Product Code"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={5}>
								<TextField
									value={viewData.name}
									size="small"
									className={classes.textField}
									id="product-name"
									label="Brand Name"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={3}>
								<TextField
									value={viewData.category}
									size="small"
									className={classes.textField}
									id="category"
									label="Category"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={2}>
								<TextField
									value={viewData.type.toUpperCase()}
									size="small"
									className={classes.textField}
									id="type"
									label="Type"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={12}>
								<TextField
									value={viewData.description || ""}
									size="small"
									className={classes.textField}
									multiline
									rows={2}
									id="description"
									label="Description"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={6}>
								<TextField
									value={viewData.quantity}
									size="small"
									className={classes.textField}
									id="quantity"
									label="Current Quantity Left"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={6}>
								<TextField
									value={viewData.unit}
									size="small"
									className={classes.textField}
									id="unit"
									label="Unit"
									variant="outlined"
									readOnly
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>

			<Tabs
				value={tabValue}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Orders" />
				<Tab label="Purchase Returns" />
			</Tabs>

			{/* Open Orders Card */}
			{tabValue === 0 && <ViewOrders />}

			{/* Open Purchase Return Card */}
			{tabValue === 1 && <ViewPurchaseReturns />}
		</div>
	);
};

export default ViewProduct;
