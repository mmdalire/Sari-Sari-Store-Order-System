import React, { useState, useEffect, useContext } from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import EmptyContainer from "../shared/UI/EmptyContainer";
import ErrorDialog from "../shared/UI/ErrorDialog";
import Loading from "../shared/UI/Loading";
import LoadingDialog from "../shared/UI/LoadingDialog";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

import { formValid, generateCode } from "../../utils/utilities";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		grid: {
			padding: theme.spacing(1),
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

const EditProduct = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [fieldData, setFieldData] = useState(null);
	const [categories, setCategories] = useState(null);
	const [isFormValid, setIsFormValid] = useState(true);
	const [readingIsLoading, setReadingIsLoading] = useState(null);

	useEffect(() => {
		const loadProduct = async () => {
			setReadingIsLoading(true); //Activate loading spinner on the card ITSELF
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/products/${auth.currentId}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setFieldData({
					name: {
						value: data.name,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					category: {
						value: data.categoryCode,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					categoryName: {
						value: data.category,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					code: {
						value: data.code,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					description: {
						value: data.description || "",
						hasError: false,
						hasTouched: true,
						error: "",
					},
					type: {
						value: data.type.toLowerCase(),
						hasError: false,
						hasTouched: true,
						error: "",
					},
					unit: {
						value: data.unit,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					price: {
						value: data.price,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					cost: {
						value: data.cost,
						hasError: false,
						hasTouched: true,
						error: "",
					},
					quantity: {
						value: data.quantity,
						hasError: false,
						hasTouched: true,
						error: "",
					},
				});
			} catch (err) {}

			setReadingIsLoading(false); //Deactivate loading spinner on the card ITSELF
		};

		loadProduct();
	}, []);

	//Get categories list for options
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/categories`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setCategories(data.data);
			} catch (err) {}
		};

		loadCategories();
	}, []);

	const handleName = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.name.value = e.target.value;
		newFieldData.name.hasTouched = true;

		if (!e.target.value) {
			newFieldData.name.hasError = true;
			newFieldData.name.error = "Brand name is required!";
		} else {
			newFieldData.name.hasError = false;
			newFieldData.name.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleCategories = (e) => {
		const newFieldData = { ...fieldData };

		//Get the label part of the dropdown
		const { innerText } = e.nativeEvent.target;

		newFieldData.category.value = e.target.value;
		newFieldData.categoryName.value = innerText;
		newFieldData.category.hasTouched = true;

		if (!e.target.value) {
			newFieldData.category.hasError = true;
			newFieldData.category.error = "Category is required!";
		} else {
			newFieldData.category.hasError = false;
			newFieldData.category.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleCode = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.code.value = e.target.value;
		newFieldData.code.hasTouched = true;

		if (!e.target.value) {
			newFieldData.code.hasError = true;
			newFieldData.code.error = "Code is required!";
		} else {
			newFieldData.code.hasError = false;
			newFieldData.code.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleDescription = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.description.value = e.target.value;

		setFieldData(newFieldData);
	};

	const handleType = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.type.value = e.target.value;

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleUnit = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.unit.value = e.target.value;

		setFieldData(newFieldData);
	};

	const handleQuantity = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.quantity.value = parseInt(e.target.value) || "";
		newFieldData.quantity.hasTouched = true;

		if (!e.target.value) {
			newFieldData.quantity.hasError = true;
			newFieldData.quantity.error = "Stock quantity is required!";
		} else {
			newFieldData.quantity.hasError = false;
			newFieldData.quantity.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handlePrice = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.price.value = parseFloat(e.target.value) || "";
		newFieldData.price.hasTouched = true;

		if (!e.target.value) {
			newFieldData.price.hasError = true;
			newFieldData.price.error = "Price is required!";
		} else {
			newFieldData.price.hasError = false;
			newFieldData.price.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleCost = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.cost.value = parseFloat(e.target.value) || "";
		newFieldData.cost.hasTouched = true;

		if (!e.target.value) {
			newFieldData.cost.hasError = true;
			newFieldData.cost.error = "Cost is required!";
		} else {
			newFieldData.cost.hasError = false;
			newFieldData.cost.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleGenerateCode = () => {
		const newFieldData = { ...fieldData };

		newFieldData.code.value = generateCode(
			fieldData.category.value,
			fieldData.name.value
		);
		newFieldData.code.hasTouched = true;
		newFieldData.code.hasError = false;
		newFieldData.code.error = "";

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData, false));
	};

	const handleSubmitProduct = async (e) => {
		e.preventDefault();

		const productData = {
			name: fieldData.name.value,
			category: fieldData.categoryName.value,
			code: fieldData.code.value,
			description: fieldData.description.value,
			type: fieldData.type.value,
			unit: fieldData.unit.value,
			price: fieldData.price.value,
			cost: fieldData.cost.value,
			quantity: fieldData.quantity.value,
			userId: auth.userId,
		};

		setReadingIsLoading(null); //To avoid displaying the error message in the form itself (editing errors must be in dialog)
		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}/api/products/${auth.currentId}`,
				"PATCH",
				JSON.stringify(productData),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose("Successfully edited category!");
		} catch (err) {}
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

			{readingIsLoading && <Loading />}
			{readingIsLoading === false && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!readingIsLoading && !httpErrors && fieldData && categories && (
				<form
					className={classes.root}
					onSubmit={handleSubmitProduct}
					noValidate
					autoComplete="off"
				>
					<Grid container>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={fieldData.name.value}
								onChange={handleName}
								size="small"
								className={classes.textField}
								id="name"
								label="Brand Name"
								variant="outlined"
								required
								error={fieldData.name.hasError}
								helperText={fieldData.name.error}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={fieldData.category.value}
								onChange={handleCategories}
								size="small"
								className={classes.textField}
								select
								label="Category"
								variant="outlined"
								required
								error={fieldData.category.hasError}
								helperText={fieldData.category.error}
							>
								{categories.map((option) => {
									return (
										<MenuItem
											key={option.code}
											value={option.code}
										>
											{option.name}
										</MenuItem>
									);
								})}
							</TextField>
						</Grid>
						<Grid item className={classes.grid} xs={10}>
							<TextField
								value={fieldData.code.value}
								onChange={handleCode}
								size="small"
								className={classes.textField}
								id="code"
								label="Code"
								variant="outlined"
								required
								error={fieldData.code.hasError}
								helperText={fieldData.code.error}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={2}>
							<Button
								type="button"
								style={{ width: "100%" }}
								disabled={
									!(
										fieldData.name.value &&
										fieldData.category.value
									)
								}
								onClick={handleGenerateCode}
								color="primary"
								variant="contained"
							>
								<OfflineBoltIcon />
							</Button>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={fieldData.description.value}
								onChange={handleDescription}
								size="small"
								className={classes.textField}
								id="description"
								label="Description"
								variant="outlined"
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<FormControl component="fieldset">
								<FormLabel component="legend">Type</FormLabel>
								<RadioGroup
									aria-label="type"
									name="type"
									value={fieldData.type.value}
									onChange={handleType}
									row
								>
									<FormControlLabel
										value="countable"
										control={
											<Radio
												color="primary"
												checked={
													fieldData.type.value ===
													"countable"
												}
											/>
										}
										label="Countable"
									/>
									<FormControlLabel
										value="mass"
										control={
											<Radio
												color="primary"
												checked={
													fieldData.type.value ===
													"mass"
												}
											/>
										}
										label="Mass"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item className={classes.grid} xs={8}>
							<TextField
								value={fieldData.unit.value}
								onChange={handleUnit}
								size="small"
								className={classes.textField}
								id="unit"
								label="Unit"
								variant="outlined"
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={fieldData.quantity.value}
								onChange={handleQuantity}
								size="small"
								className={classes.textField}
								id="quantity"
								label="Stock quantity"
								variant="outlined"
								error={fieldData.quantity.hasError}
								helperText={fieldData.quantity.error}
								type="number"
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={fieldData.price.value}
								onChange={handlePrice}
								size="small"
								className={classes.textField}
								id="price"
								label="Price"
								variant="outlined"
								error={fieldData.price.hasError}
								helperText={fieldData.price.error}
								type="number"
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={fieldData.cost.value}
								onChange={handleCost}
								size="small"
								className={classes.textField}
								id="cost"
								label="Cost"
								variant="outlined"
								error={fieldData.cost.hasError}
								helperText={fieldData.cost.error}
								type="number"
							/>
						</Grid>

						<Grid
							item
							className={classes.grid}
							style={{ textAlign: "right" }}
							xs={12}
						>
							<Button
								color="secondary"
								variant="contained"
								type="submit"
								disabled={!isFormValid}
								startIcon={<SaveIcon />}
							>
								{" "}
								Save Changes{" "}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</>
	);
};

export default EditProduct;
