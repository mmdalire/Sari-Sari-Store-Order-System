import React, { useState } from "react";

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

const DUMMY_PRODUCT = {
	_id: "620741cb8891781725651d1f",
	name: "CENTURY TUNA",
	category: "CANNED GOODS",
	description: "Some tuna",
	code: "CAN-CTU",
	type: "Some tuna",
	unit: "pcs",
	price: 40,
	cost: 30,
	quantity: 14,
	userId: "6205d6667325c8cef024bd72",
	createdDate: "2022-02-12T04:45:17.324Z",
	isActive: true,
	__v: 0,
};

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

	const [tabValue, setTabValue] = useState(0); //Open ORDERS (0) by default

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
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={2}>
							<TextField
								value={DUMMY_PRODUCT.code}
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
								value={DUMMY_PRODUCT.name}
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
								value={DUMMY_PRODUCT.category}
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
								value={DUMMY_PRODUCT.type}
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
								value={DUMMY_PRODUCT.description}
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
								value={DUMMY_PRODUCT.quantity}
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
								value={DUMMY_PRODUCT.unit}
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
