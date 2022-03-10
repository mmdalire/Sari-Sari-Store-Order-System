import React, { useState, useEffect, useRef, useContext } from "react";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DraftsIcon from "@material-ui/icons/Drafts";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import ErrorDialog from "../shared/UI/ErrorDialog";
import LoadingDialog from "../shared/UI/LoadingDialog";
import ModalTemplate from "../shared/UI/ModalTemplate";
import PrepareOrder from "./PrepareOrder";
import SelectCustomer from "./SelectCustomer";
import SelectProduct from "./SelectProduct";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

import { formValid } from "../../utils/utilities";

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

const selectCustomerModal = {
	operation: "selectCustomer",
	top: 20,
	left: 200,
	width: 1000,
	title: "Select Customer",
	icon: (
		<PersonAddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

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

const CreateOrder = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const creditRef = useRef(null);
	const [formOrderValid, setFormOrderValid] = useState({
		customers: false,
		products: false,
		credit: true, //By default, 0 is the preferred credit
	});
	const [errors, setErrors] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(selectCustomerModal);
	const [customerData, setCustomerData] = useState({
		id: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		customerNumber: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		firstName: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		lastName: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		middleInitial: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
	});

	const [productsData, setProductsData] = useState({
		value: [],
		total: 0,
		hasError: false,
		hasTouched: false,
		error: "",
	});

	const [orderData, setOrderData] = useState({
		credit: {
			value: 0,
			hasError: false,
			hasTouched: true,
			error: "",
		},
		remarks: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
	});

	//Update the disable prop of the submit buttons whenever a product is being deleted
	useEffect(() => {
		const newFormValidData = { ...formOrderValid };
		newFormValidData.products =
			productsData.value.length > 0 &&
			productsData.value.every(
				(product) =>
					product.orderQuantity > 0 &&
					product.quantity > product.orderQuantity
			);

		setFormOrderValid(newFormValidData);
	}, [productsData.value.length]);

	//Update credit errors whenever any of products inside of the cart changes
	useEffect(() => {
		if (productsData.total > 0) {
			updateCredit(creditRef.current.value);
		}
	}, [productsData.total]);

	const updateCredit = (credit) => {
		const newOrderData = { ...orderData };
		const newFormValidData = { ...formOrderValid };

		//Credit has no input
		if (!credit) {
			newOrderData.credit.value = "";
			newOrderData.credit.hasError = false;
			newOrderData.credit.error = "";
			setOrderData(newOrderData);

			newFormValidData.credit = true;
			setFormOrderValid(newFormValidData);
			return;
		}

		//Credit has input but still is being checked for validations
		newOrderData.credit.value = parseInt(credit);
		if (parseInt(credit) < 0) {
			newOrderData.credit.hasError = true;
			newOrderData.credit.error = "Credit cannot be a negative value!";
			setOrderData(newOrderData);

			newFormValidData.credit = false;
		} else if (parseInt(credit) > productsData.total) {
			newOrderData.credit.hasError = true;
			newOrderData.credit.error =
				"Credit cannot be greater than the total amount!";
			setOrderData(newOrderData);

			newFormValidData.credit = false;
		} else {
			newOrderData.credit.hasError = false;
			newOrderData.credit.error = "";
			setOrderData(newOrderData);

			newFormValidData.credit = true;
		}

		setFormOrderValid(newFormValidData);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleModalConfigSelectCustomer = () => {
		setModalConfig(selectCustomerModal);
		setOpenModal(true);
	};

	const handleModalConfigSelectProduct = () => {
		setModalConfig(selectProductModal);
		setOpenModal(true);
	};

	const handleClearErrors = () => {
		setErrors(null);
		clearError();
	};

	const handleSelectCustomer = (customer) => {
		const newFieldData = { ...customerData };
		newFieldData.id.value = customer._id;
		newFieldData.id.hasTouched = true;
		newFieldData.customerNumber.value = customer.customerNo;
		newFieldData.firstName.value = customer.firstName;
		newFieldData.lastName.value = customer.lastName;
		newFieldData.middleInitial.value = customer.middleInitial;

		setCustomerData(newFieldData);

		//Check if a customer is selected for the order to be VALID
		const newFormValidData = { ...formOrderValid };
		newFormValidData.customers = formValid(customerData);
		setFormOrderValid(newFormValidData);

		setOpenModal(false);
	};

	const handleSelectProduct = (product) => {
		const existIndex = productsData.value.findIndex(
			(existProduct) => existProduct.code === product.code
		);

		//Check if the selected product exists in the current order
		if (existIndex >= 0) {
			setErrors("You have already selected this product!");
			return;
		}

		const newProductsData = { ...productsData };
		newProductsData.value = [...productsData.value, product];

		setProductsData(newProductsData);
	};

	const handleChangeOrderQuantity = (code, orderQuantity = 0) => {
		const existIndex = productsData.value.findIndex(
			(existProduct) => existProduct.code === code
		);

		const newProductsData = { ...productsData };
		newProductsData.value[existIndex].orderQuantity = orderQuantity;
		newProductsData.value[existIndex].subtotal =
			orderQuantity * newProductsData.value[existIndex].price;
		newProductsData.total = productsData.value.reduce((total, product) => {
			return total + product.price * product.orderQuantity;
		}, 0);

		setProductsData(newProductsData);

		//Check if all products entered have at least 1 ordered quantity AND the ordered quantity does NOT exceed the stock quantity for the order to be VALID
		const newFormValidData = { ...formOrderValid };
		newFormValidData.products = productsData.value.every(
			(product) =>
				product.orderQuantity > 0 &&
				product.quantity >= product.orderQuantity
		);
		setFormOrderValid(newFormValidData);
	};

	const handleDeleteProduct = (id) => {
		const newProductsData = { ...productsData };
		newProductsData.value = productsData.value.filter(
			(product) => product.code !== id
		);
		newProductsData.total = productsData.value.reduce((total, product) => {
			if (product.code !== id) {
				return total + product.price * product.orderQuantity;
			}
			return total;
		}, 0);

		setProductsData(newProductsData);

		//Update the credit errors everytime a product is being deleted
		updateCredit(creditRef.current.value);
	};

	const handleCreditChange = (e) => {
		updateCredit(e.target.value);
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

		const formattedProducts = productsData.value.map((product) => {
			return {
				code: product.code,
				name: product.name,
				quantity: product.orderQuantity,
				price: product.price,
				cost: product.cost,
			};
		});

		const submitOrderData = {
			customer: customerData.id.value,
			products: formattedProducts,
			credit: orderData.credit.value,
			status,
			remarks: orderData.remarks.value,
			userId: auth.userId,
		};

		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/orders`,
				"POST",
				JSON.stringify(submitOrderData),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose("Successfully created order!");
		} catch (err) {}
	};

	const selectBody = () => {
		switch (modalConfig.operation) {
			case "selectCustomer":
				return <SelectCustomer onHandleSelect={handleSelectCustomer} />;
			case "selectProduct":
				return <SelectProduct onHandleSelect={handleSelectProduct} />;
		}
	};

	return (
		<>
			{isLoading && <LoadingDialog />}

			{/* Dialogs */}
			{!isLoading && (errors || httpErrors) && (
				<ErrorDialog
					open={!!(errors || httpErrors)}
					message={errors || httpErrors}
					onHandleClose={handleClearErrors}
				/>
			)}

			{/* Modals */}
			{!isLoading && (
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
			)}

			{!isLoading && (
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
								<Grid item className={classes.grid} xs={4}>
									<Button
										color="primary"
										variant="contained"
										startIcon={<PersonAddIcon />}
										onClick={
											handleModalConfigSelectCustomer
										}
									>
										{" "}
										Select Customer{" "}
									</Button>
								</Grid>

								<Grid item className={classes.grid} xs={8}>
									<TextField
										value={
											customerData.customerNumber.value
										}
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
										value={customerData.lastName.value}
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
										value={customerData.firstName.value}
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
										value={customerData.middleInitial.value}
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
								<Grid item className={classes.grid} xs={12}>
									<Button
										color="primary"
										variant="contained"
										startIcon={<AddShoppingCartIcon />}
										onClick={handleModalConfigSelectProduct}
									>
										{" "}
										Select Product{" "}
									</Button>
								</Grid>

								<Grid item className={classes.grid} xs={12}>
									<PrepareOrder
										data={productsData.value}
										total={productsData.total}
										onQuantityChange={
											handleChangeOrderQuantity
										}
										onDelete={handleDeleteProduct}
									/>
								</Grid>

								<Grid item className={classes.grid} xs={12}>
									<TextField
										inputRef={creditRef}
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
						<Button
							color="primary"
							variant="outlined"
							style={{ marginRight: 10 }}
							type="submit"
							id="draft"
							onClick={handleSubmitOrder}
							disabled={
								!(
									formOrderValid.customers &&
									formOrderValid.products &&
									formOrderValid.credit
								)
							}
							startIcon={<DraftsIcon />}
						>
							{" "}
							Save as draft{" "}
						</Button>
						<Button
							color="primary"
							variant="contained"
							type="submit"
							id="submit"
							onClick={handleSubmitOrder}
							disabled={
								!(
									formOrderValid.customers &&
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

export default CreateOrder;
