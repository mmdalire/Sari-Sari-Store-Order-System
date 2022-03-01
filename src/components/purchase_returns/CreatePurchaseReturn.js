import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import DynamicTable from "../shared/UI/DynamicTable";
import ErrorDialog from "../shared/UI/ErrorDialog";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import { formValid } from "../../utils/utilities";

const DUMMY_ROWS = [
	{
		poNo: "PONO202202-0001",
		customer: "TEST1 TESTL1",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
			{
				code: "CGO-LSB",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
			{
				code: "CGO-LSC",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
			{
				code: "CGO-LSD",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
			{
				code: "CGO-LSE",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
			{
				code: "CGO-LSF",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0002",
		customer: "TEST2 TESTL2",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0003",
		customer: "TEST3 TESTL3",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0004",
		customer: "TEST4 TESTL4",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		status: "CANCELLED",
	},
	{
		poNo: "PONO202202-0005",
		customer: "TEST5 TESTL5",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0006",
		customer: "TEST6 TESTL6",
		products: [
			{
				code: "CGO-MSA",
				name: "MEGA SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abd",
			},
			{
				code: "CGO-LSA",
				name: "LIGO SARDINES",
				quantity: 10,
				price: 21,
				cost: 17,
				_id: "620fbff03f030d924d878abe",
			},
		],
		edPrice: 0,
		credit: 1,
		status: "SUBMIT",
	},
];

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 100 },
	{ id: "name", label: "Brand Name", minWidth: 300 },
	{ id: "quantity", label: "Order Quantity" },
	{ id: "returnQuantity", label: "Return Quantity" },
	{ id: "deleteAction", label: "" },
];

const fieldErrors = {
	required: "Quantity is required!",
	notBeZero: "Quantity must be greater than 0",
	greaterThanValue: "Quantity exceeds than the order quantity",
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

const CreatePurchaseReturn = (props) => {
	const classes = useStyles();

	const [errors, setErrors] = useState(null);
	const [formValid, setFormValid] = useState(false);
	const [orderNumber, setOrderNumber] = useState("");
	const [showOrderDetails, setShowOrderDetails] = useState(false);
	const [orderDetail, setOrderDetail] = useState(null);
	const [reason, setReason] = useState("");

	//Update the disable prop of the submit button whenever a product is being deleted
	useEffect(() => {
		//Check if all products entered have at least 1 returned quantity and at least has a returned quantity
		const purchaseReturnValid =
			orderDetail &&
			orderDetail.products.length > 0 &&
			orderDetail.products.every(
				(product) =>
					product.returnQuantity > 0 &&
					product.quantity >= product.returnQuantity
			);
		setFormValid(purchaseReturnValid);
	}, [orderDetail]);

	const handleChangeOrderNumber = (e) => {
		setOrderNumber(e.target.value);
	};

	const handleCloseShowDetails = () => {
		setShowOrderDetails(false);
		setOrderDetail(null);
		setFormValid(false);
	};

	const handleClearErrors = () => {
		setErrors(null);
	};

	const handleSearchOrder = () => {
		const orderDetail = DUMMY_ROWS.find(
			(order) => order.poNo === orderNumber.toUpperCase()
		);

		if (orderDetail) {
			setOrderDetail(orderDetail);
			setShowOrderDetails(true);
			return;
		}

		setErrors(
			"This order does not exists! Please check the order number and try again."
		);
	};

	const handleReturnQuantityChange = (code, returnQuantity = 0) => {
		const newOrderDetail = { ...orderDetail };
		const index = orderDetail.products.findIndex(
			(order) => order.code === code
		);
		orderDetail.products[index].returnQuantity = returnQuantity;

		setOrderDetail(newOrderDetail);

		//Check if all products entered have at least 1 returned quantity AND the return quantity does NOT exceed the order quantity for the purchase return to be VALID
		const purchaseReturnValid = orderDetail.products.every(
			(product) =>
				product.returnQuantity > 0 &&
				product.quantity >= product.returnQuantity
		);
		setFormValid(purchaseReturnValid);
	};

	const handleDelete = (code) => {
		const newOrderDetail = { ...orderDetail };
		newOrderDetail.products = orderDetail.products.filter(
			(product) => product.code !== code
		);

		setOrderDetail(newOrderDetail);
	};

	const handleReasonChange = (e) => {
		setReason(e.target.value);
	};

	const handleSubmitPurchaseReturn = (e) => {
		e.preventDefault();

		const formatReturnedProducts = orderDetail.products.map((product) => {
			return {
				code: product.code,
				name: product.name,
				quantity: product.returnQuantity,
				price: product.price,
			};
		});

		const purchaseReturn = {
			order: orderNumber,
			returnedProducts: formatReturnedProducts,
			reason,
		};

		console.log(purchaseReturn);
	};

	return (
		<>
			{/* Dialogs */}
			{errors && (
				<ErrorDialog
					open={!!errors}
					message={errors}
					onHandleClose={handleClearErrors}
				/>
			)}

			<form
				className={classes.root}
				onSubmit={handleSubmitPurchaseReturn}
				noValidate
				autoComplete="off"
			>
				<Card variant="outlined" className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title={
							<Typography variant="h6" color="primary">
								Order Reference
							</Typography>
						}
					/>
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={11}>
								<TextField
									value={orderNumber}
									onChange={handleChangeOrderNumber}
									size="small"
									className={classes.textField}
									id="order-number"
									label="Order Number"
									variant="outlined"
									disabled={!!orderDetail}
								/>
							</Grid>
							<Grid item className={classes.grid} xs={1}>
								<Button
									type="button"
									style={{ width: "100%" }}
									disabled={!orderNumber || !!orderDetail}
									onClick={handleSearchOrder}
									color="primary"
									variant="contained"
								>
									<SearchIcon />
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				{showOrderDetails && (
					<>
						<Card variant="outlined" className={classes.card}>
							<CardHeader
								className={classes.cardHeader}
								title={
									<Typography variant="h6" color="primary">
										Order details
									</Typography>
								}
							/>
							<CardContent className={classes.cardContent}>
								<Grid container>
									<Grid item className={classes.grid} xs={12}>
										<Button
											type="button"
											style={{ width: "30%" }}
											onClick={handleCloseShowDetails}
											color="primary"
											variant="contained"
											startIcon={<CancelIcon />}
										>
											Change Order Number
										</Button>
									</Grid>
									<Grid item className={classes.grid} xs={12}>
										<DynamicTable
											headers={tableHeaders}
											fieldErrors={fieldErrors}
											data={orderDetail.products}
											onNumberChange={
												handleReturnQuantityChange
											}
											onDelete={handleDelete}
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
						<Card variant="outlined" className={classes.card}>
							<CardHeader
								className={classes.cardHeader}
								title={
									<Typography variant="h6" color="primary">
										Reason for return
									</Typography>
								}
							/>
							<CardContent className={classes.cardContent}>
								<Grid container>
									<Grid item className={classes.grid} xs={12}>
										<TextField
											value={reason}
											onChange={handleReasonChange}
											size="small"
											multiline
											rows={3}
											className={classes.textField}
											id="reason"
											variant="outlined"
											placeholder="Optional"
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>

						<Grid
							item
							className={classes.grid}
							style={{ textAlign: "right" }}
							xs={12}
						>
							<Button
								color="primary"
								variant="contained"
								type="submit"
								id="submit"
								// onClick={handleSubmitOrder}
								disabled={!formValid}
								startIcon={<SaveIcon />}
							>
								{" "}
								Submit Purchase Return{" "}
							</Button>
						</Grid>
					</>
				)}
			</form>
		</>
	);
};

export default CreatePurchaseReturn;
