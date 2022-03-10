import React, { useState, useEffect, useContext } from "react";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DraftsIcon from "@material-ui/icons/Drafts";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import EmptyContainer from "../shared/UI/EmptyContainer";
import ErrorDialog from "../shared/UI/ErrorDialog";
import ListingTable from "../shared/UI/ListingTable";
import Loading from "../shared/UI/Loading";
import LoadingDialog from "../shared/UI/LoadingDialog";
import ModalTemplate from "../shared/UI/ModalTemplate";
import PrepareOrder from "./PrepareOrder";
import SnackbarTemplate from "../shared/UI/SnackbarTemplate";
import SelectProduct from "./SelectProduct";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 150 },
	{ id: "name", label: "Brand Name", minWidth: 100 },
	{ id: "price", label: "Price", align: "right" },
	{ id: "orderQuantity", label: "Order Quantity", align: "right" },
	{ id: "subtotal", label: "Subtotal", align: "right" },
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
		textField: {
			width: "100%",
			backgroundColor: "white",
		},
		success: {
			backgroundColor: green[100],
			color: green[900],
			fontWeight: "bold",
		},
	};
});

const selectProductModal = {
	operation: "selectProduct",
	top: 20,
	left: 200,
	width: 1000,
	title: "Select Product",
	icon: (
		<AddShoppingCartIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const EditOrder = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [warnings, setWarnings] = useState(null);
	const [formOrderValid, setFormOrderValid] = useState({
		products: false, //Remove validation for products if the order status is SUBMIT
		credit: true, //By default, 0 is the preferred credit
	});
	const [errors, setErrors] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(selectProductModal);
	const [orderData, setOrderData] = useState(null);
	const [readingIsLoading, setReadingIsLoading] = useState(null);

	useEffect(() => {
		const loadOrderInfo = async () => {
			try {
				setReadingIsLoading(true); //Activate loading spinner on the card ITSELF
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/orders/${auth.currentId}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setOrderData({
					customerId: {
						value: data.customer._id,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					customerNumber: {
						value: data.customer.customerNumber,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					firstName: {
						value: data.customer.firstName,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					lastName: {
						value: data.customer.lastName,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					middleInitial: {
						value: data.customer.middleInitial,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					products: {
						value: data.products,
						hasError: false,
						hasTouched: false,
						error: "",
					},
					total: data.products.reduce(
						(total, product) =>
							total + product.orderQuantity * product.price,
						0
					),
					credit: {
						value: data.credit,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					remarks: {
						value: data.remarks,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					status: {
						value: data.status,
					},
				});
			} catch (err) {}

			setReadingIsLoading(false); //Deactivate loading spinner on the card ITSELF
		};

		loadOrderInfo();
	}, []);

	//Check if all quantities of each product is valid (if each order quantity doesn't exceed the stock quantity)
	useEffect(() => {
		if (orderData) {
			const isAllValid = orderData.products.value.every((product) => {
				return product.quantity >= product.orderQuantity;
			});

			if (!isAllValid) {
				setWarnings(
					"Some products have an order quantity that exceeds the stock quantity. Please make sure that the given information is correct."
				);
			} else {
				setWarnings(
					"Please make sure that the given information is correct."
				);
			}
		}
	}, [readingIsLoading]);

	//Update the disable prop of the submit buttons whenever a product is being deleted
	useEffect(() => {
		if (orderData && orderData.products.value.length >= 0) {
			const newFormValidData = { ...formOrderValid };
			newFormValidData.products =
				orderData.products.value.length > 0 &&
				orderData.products.value.every(
					(product) =>
						product.orderQuantity > 0 &&
						product.quantity > product.orderQuantity
				);

			setFormOrderValid(newFormValidData);
		}
	}, [orderData]);

	// Update the submit button disability based on credits and order validations
	useEffect(() => {
		const newFormOrderValid = { ...formOrderValid };
		//Validation for products

		//If all products has quantities
		if (orderData && orderData.total > 0) {
			newFormOrderValid.products =
				orderData.products.value.length > 0 &&
				orderData.products.value.every(
					(product) =>
						product.orderQuantity > 0 &&
						product.quantity >= product.orderQuantity
				);
		}

		//Validation for credit
		if (orderData && orderData.credit.hasError) {
			newFormOrderValid.credit = false;
		} else if (orderData && !orderData.credit.hasError) {
			// If the total is lesser than the credit
			if (orderData.total < orderData.credit.value) {
				newFormOrderValid.credit = false;
			}
			//If the credit is valid
			else {
				newFormOrderValid.credit = true;
			}
		}

		setFormOrderValid(newFormOrderValid);
	}, [orderData]);

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleModalConfigSelectProduct = () => {
		setModalConfig(selectProductModal);
		setOpenModal(true);
	};

	const handleClearErrors = () => {
		setErrors(null);
	};

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleSelectProduct = (product) => {
		const existIndex = orderData.products.value.findIndex(
			(existProduct) => existProduct.code === product.code
		);

		//Check if the selected product exists in the current order
		if (existIndex >= 0) {
			setErrors("You have already selected this product!");
			return;
		}

		const newOrderData = { ...orderData };
		newOrderData.products.value = [...newOrderData.products.value, product];

		setOrderData(newOrderData);
	};

	const handleChangeOrderQuantity = (code, orderQuantity = 0) => {
		const existIndex = orderData.products.value.findIndex(
			(existProduct) => existProduct.code === code
		);

		const newOrderData = { ...orderData };
		newOrderData.products.value[existIndex].orderQuantity = orderQuantity;
		newOrderData.products.value[existIndex].subtotal =
			orderQuantity * newOrderData.products.value[existIndex].price;
		newOrderData.total = orderData.products.value.reduce(
			(total, product) => {
				return total + product.price * product.orderQuantity;
			},
			0
		);

		setOrderData(newOrderData);
	};

	const handleDeleteProduct = (id) => {
		const newOrderData = { ...orderData };
		newOrderData.products.value = orderData.products.value.filter(
			(product) => product.code !== id
		);
		newOrderData.total = newOrderData.products.value.reduce(
			(total, product) => {
				if (product.code !== id) {
					return total + product.price * product.orderQuantity;
				}
				return total;
			},
			0
		);

		setOrderData(newOrderData);
	};

	const handleCreditChange = (e) => {
		const newOrderData = { ...orderData };

		//If the credit is less than 0
		if (parseInt(e.target.value) < 0) {
			newOrderData.credit.value = parseInt(e.target.value);
			newOrderData.credit.hasError = true;
			newOrderData.credit.error = "Credit cannot be less than zero!";
			setOrderData(newOrderData);
			return;
		}
		//If the credit is greater than the total order amount
		else if (parseInt(e.target.value) > orderData.total) {
			newOrderData.credit.value = parseInt(e.target.value);
			newOrderData.credit.hasError = true;
			newOrderData.credit.error =
				"Credit cannot be greater than the total amount!";
			setOrderData(newOrderData);
			return;
		}
		//Allow empty credit
		else {
			newOrderData.credit.value = parseInt(e.target.value);
			newOrderData.credit.hasError = false;
			newOrderData.credit.error = "";
			setOrderData(newOrderData);
			return;
		}
	};

	const handleRemarksChange = (e) => {
		const newOrderData = { ...orderData };
		newOrderData.remarks.value = e.target.value;

		setOrderData(newOrderData);
	};

	const handleSubmitOrder = async (e) => {
		e.preventDefault();

		//Get the status of the order
		const status = e.currentTarget.id;

		const formattedProducts = orderData.products.value.map((product) => {
			return {
				code: product.code,
				name: product.name,
				quantity: product.orderQuantity,
				price: product.price,
				cost: product.cost,
			};
		});

		const submitOrderData = {
			customer: orderData.customerId.value,
			products: formattedProducts,
			credit: orderData.credit.value,
			status,
			remarks: orderData.remarks.value,
			userId: auth.userId,
		};

		setReadingIsLoading(null); //To avoid displaying the error message in the form itself (editing errors must be in dialog)
		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/orders/${auth.currentId}`,
				"PATCH",
				JSON.stringify(submitOrderData),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose("Successfully edited order!");
		} catch (err) {}
	};

	const selectBody = () => {
		switch (modalConfig.operation) {
			case "selectProduct":
				return <SelectProduct onHandleSelect={handleSelectProduct} />;
		}
	};

	return (
		<>
			{/* Loading in updating */}
			{
				isLoading && !readingIsLoading && (
					<LoadingDialog />
				) /*Loading dialog appears only when updating the customer*/
			}
			{!isLoading && readingIsLoading == null && httpErrors && (
				<ErrorDialog
					open={!!httpErrors}
					message={httpErrors}
					onHandleClose={clearError}
				/>
			)}

			{/*Snackbars*/}
			{warnings && (
				<SnackbarTemplate
					open={!!warnings}
					type="warning"
					message={warnings}
					onHandleClose={handleClearWarnings}
				/>
			)}
			{/* Dialogs */}
			{errors && (
				<ErrorDialog
					open={!!errors}
					message={errors}
					onHandleClose={handleClearErrors}
				/>
			)}
			{/* Modals */}
			<ModalTemplate
				open={openModal}
				onClose={handleCloseModal}
				top={modalConfig.top}
				left={modalConfig.left}
				width={modalConfig.width}
				modalTitle={modalConfig.title}
				modalIcon={modalConfig.icon}
			>
				{selectBody()}
			</ModalTemplate>

			{readingIsLoading && <Loading />}
			{readingIsLoading === false && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!readingIsLoading && !httpErrors && orderData && (
				<form noValidate autoComplete="off" className={classes.root}>
					<Card variant="outlined" className={classes.card}>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography variant="h6" color="primary">
									Customer Information
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								<Grid item className={classes.grid} xs={12}>
									<TextField
										value={orderData.customerNumber.value}
										size="small"
										className={classes.textField}
										id="customer-number"
										label="Customer Number"
										variant="outlined"
										readOnly
										disabled
									/>
								</Grid>
								<Grid item className={classes.grid} xs={5}>
									<TextField
										value={orderData.lastName.value}
										size="small"
										className={classes.textField}
										id="customer-last-name"
										label="Last Name"
										variant="outlined"
										readOnly
										disabled
									/>
								</Grid>
								<Grid item className={classes.grid} xs={5}>
									<TextField
										value={orderData.firstName.value}
										size="small"
										className={classes.textField}
										id="customer-first-name"
										label="First Name"
										variant="outlined"
										readOnly
										disabled
									/>
								</Grid>
								<Grid item className={classes.grid} xs={2}>
									<TextField
										value={orderData.middleInitial.value}
										size="small"
										className={classes.textField}
										id="customer-middle-initial"
										label="MI"
										variant="outlined"
										readOnly
										disabled
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
									Cart
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								{orderData.status.value === "DRAFT" && (
									<Grid item className={classes.grid} xs={12}>
										<Button
											color="primary"
											variant="contained"
											startIcon={<AddShoppingCartIcon />}
											onClick={
												handleModalConfigSelectProduct
											}
										>
											{" "}
											Select Product{" "}
										</Button>
									</Grid>
								)}

								<Grid item className={classes.grid} xs={12}>
									{/* Allow edit of products when DRAFTED */}
									{orderData.status.value === "DRAFT" && (
										<PrepareOrder
											data={orderData.products.value}
											total={orderData.total}
											onQuantityChange={
												handleChangeOrderQuantity
											}
											onDelete={handleDeleteProduct}
											edit
										/>
									)}
									{/* Disllow edit of products when SUBMITTED, only credit is allowed to be updated */}
									{orderData.status.value === "SUBMIT" && (
										<ListingTable
											headers={tableHeaders}
											data={orderData.products.value}
											total={orderData.total}
										/>
									)}
								</Grid>

								<Grid item className={classes.grid} xs={12}>
									<TextField
										value={orderData.credit.value}
										onChange={handleCreditChange}
										size="small"
										type="number"
										className={classes.textField}
										id="credit"
										label="Credit"
										variant="outlined"
										error={orderData.credit.hasError}
										helperText={orderData.credit.error}
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
									Remarks
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								<Grid item className={classes.grid} xs={12}>
									<TextField
										value={orderData.remarks.value}
										onChange={handleRemarksChange}
										size="small"
										multiline
										rows={3}
										className={classes.textField}
										id="remarks"
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
						{orderData.status.value === "DRAFT" && (
							<Button
								color="secondary"
								variant="contained"
								style={{ marginRight: 10 }}
								type="submit"
								id="draft"
								onClick={handleSubmitOrder}
								disabled={
									!(
										formOrderValid.products &&
										formOrderValid.credit
									)
								}
								startIcon={<DraftsIcon />}
							>
								{" "}
								Save and submit as draft{" "}
							</Button>
						)}
						<Button
							color="primary"
							variant="contained"
							type="submit"
							id="submit"
							onClick={handleSubmitOrder}
							disabled={
								!(
									formOrderValid.products &&
									formOrderValid.credit
								)
							}
							startIcon={<SendIcon />}
						>
							{" "}
							Submit Order{" "}
						</Button>
					</Grid>
				</form>
			)}
		</>
	);
};

export default EditOrder;
