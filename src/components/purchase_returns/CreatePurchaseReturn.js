import React, { useState, useContext, useEffect } from "react";

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
import Loading from "../shared/UI/Loading";
import LoadingDialog from "../shared/UI/LoadingDialog";
import { makeStyles } from "@material-ui/styles";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 100 },
	{ id: "name", label: "Brand Name", minWidth: 300 },
	{ id: "quantity", label: "Quantity Left" },
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

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [errors, setErrors] = useState(null);
	const [formValid, setFormValid] = useState(false);
	const [orderNumber, setOrderNumber] = useState("");
	const [orderDetail, setOrderDetail] = useState(null);
	const [reason, setReason] = useState("");
	const [sendIsLoading, setSendIsLoading] = useState(false);

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
		setOrderDetail(null);
		setFormValid(false);
	};

	const handleClearErrors = () => {
		setErrors(null);
	};

	const handleSearchOrder = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/purchase_return/${orderNumber}/order`;

		try {
			const data = await sendRequest(url, "GET", null, {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			});

			//If the order does not exists
			if (data.products.length === 0) {
				setErrors(data.message);
				return;
			}

			setOrderDetail({
				products: data.products,
				showOrderDetails: true,
			});
		} catch (err) {}
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

	const handleSubmitPurchaseReturn = async (e) => {
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
			userId: auth.userId,
		};

		try {
			setSendIsLoading(true);

			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/purchase_return`,
				"POST",
				JSON.stringify(purchaseReturn),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose("Successfully returned product/s!");
		} catch (err) {}
		setSendIsLoading(false);
	};

	return (
		<>
			{sendIsLoading && <LoadingDialog />}

			{/* Dialogs */}
			{!sendIsLoading && errors && (
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
				{isLoading && !sendIsLoading && <Loading />}
				{!isLoading && !sendIsLoading && httpErrors && (
					<ErrorDialog
						open={!!httpErrors}
						message={httpErrors}
						onHandleClose={clearError}
					/>
				)}
				{!isLoading && !sendIsLoading && !httpErrors && orderDetail && (
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
