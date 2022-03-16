import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ListingTable from "../shared/UI/ListingTable";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

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

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 150 },
	{ id: "name", label: "Brand Name", minWidth: 100 },
	{ id: "price", label: "Price", align: "right" },
	{ id: "orderQuantity", label: "Order Quantity", align: "right" },
	{ id: "subtotal", label: "Subtotal", align: "right" },
];

const tableHeadersReturn = [
	{ id: "_id", label: "Product Code", minWidth: 150 },
	{ id: "name", label: "Brand Name", minWidth: 100 },
	{ id: "price", label: "Price", align: "right" },
	{ id: "quantity", label: "Return Quantity", align: "right" },
	{ id: "relatedPrtNo", label: "PRTs" },
];

const ViewOrder = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);
	const [prts, setPrts] = useState(null);

	const total = viewData
		? viewData.products.reduce(
				(total, product) =>
					total + product.orderQuantity * product.price,
				0
		  )
		: 0;

	useEffect(() => {
		const loadOrderInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/orders/${auth.currentId}`,
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

		loadOrderInfo();
	}, []);

	useEffect(() => {
		const loadPrts = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/orders/${auth.currentId}/purchase_return`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setPrts(data);
			} catch (err) {}
		};

		loadPrts();
	}, []);

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Order Information
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
							<Grid item className={classes.grid} xs={5}>
								<TextField
									value={viewData.poNo}
									size="small"
									className={classes.textField}
									id="po-number"
									label="Order Number"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={3}>
								<TextField
									value={moment(viewData.createdDate).format(
										"MMMM D, YYYY "
									)}
									size="small"
									className={classes.textField}
									id="po-date"
									label="Order Date"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={2}>
								<TextField
									value={moment(viewData.createdDate).format(
										"hh:mm A"
									)}
									size="small"
									className={classes.textField}
									id="po-time"
									label="Order Time"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={2}>
								<TextField
									value={viewData.status}
									size="small"
									className={classes.textField}
									id="po-status"
									label="Order Status"
									variant="outlined"
									readOnly
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Customer Information
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
							<Grid item className={classes.grid} xs={12}>
								<TextField
									value={viewData.customer.customerNumber}
									size="small"
									className={classes.textField}
									id="customer-number"
									label="Customer Number"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={5}>
								<TextField
									value={viewData.customer.lastName}
									size="small"
									className={classes.textField}
									id="customer-last-name"
									label="Last Name"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={5}>
								<TextField
									value={viewData.customer.firstName}
									size="small"
									className={classes.textField}
									id="customer-first-name"
									label="First Name"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={2}>
								<TextField
									value={viewData.customer.middleInitial}
									size="small"
									className={classes.textField}
									id="customer-middle-initial"
									label="MI"
									variant="outlined"
									readOnly
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Order details
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
							<Grid item className={classes.grid} xs={12}>
								<ListingTable
									headers={tableHeaders}
									data={viewData.products}
									total={total}
								/>
							</Grid>
							<Grid item className={classes.grid} xs={12}>
								<TextField
									value={viewData.credit}
									size="small"
									className={classes.textField}
									id="credit"
									label="Credit"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={12}>
								<TextField
									value={viewData.remarks || ""}
									size="small"
									className={classes.textField}
									id="remarks"
									label="Remarks"
									variant="outlined"
									readOnly
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Product returns
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
				{!isLoading && !httpErrors && prts && prts.length === 0 && (
					<EmptyContainer message="No returns on this order yet!" />
				)}
				{!isLoading && !httpErrors && prts && prts.length > 0 && (
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={12}>
								<ListingTable
									headers={tableHeadersReturn}
									data={prts}
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>
		</div>
	);
};

export default ViewOrder;
