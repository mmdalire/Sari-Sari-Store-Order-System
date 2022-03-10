import React, { useState, useEffect, useContext } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import EmptyContainer from "../shared/UI/EmptyContainer";
import ErrorDialog from "../shared/UI/ErrorDialog";
import Loading from "../shared/UI/Loading";
import LoadingDialog from "../shared/UI/LoadingDialog";

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
		textField: {
			width: "100%",
		},
	};
});

const ChangePriceAndCost = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [fieldData, setFieldData] = useState(null);
	const [isFormValid, setIsFormValid] = useState(true);
	const [readingIsLoading, setReadingIsLoading] = useState(null);

	useEffect(() => {
		const loadProduct = async () => {
			setReadingIsLoading(true); //Activate loading spinner on the card ITSELF
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/products/${auth.currentId}`,
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
					code: {
						value: data.code,
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
				});
			} catch (err) {}

			setReadingIsLoading(false); //Deactivate loading spinner on the card ITSELF
		};

		loadProduct();
	}, []);

	const handlePrice = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.price.value = parseInt(e.target.value);
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
		newFieldData.cost.value = parseInt(e.target.value);
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

	const handleSubmitOrder = async (e) => {
		e.preventDefault();

		const productData = {
			price: fieldData.price.value,
			cost: fieldData.cost.value,
			userId: auth.userId,
		};

		setReadingIsLoading(null); //To avoid displaying the error message in the form itself (editing errors must be in dialog)
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/products/${auth.currentId}/changePriceAndCost`,
				"PATCH",
				JSON.stringify(productData),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose(data.message);
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
			{!readingIsLoading && !httpErrors && fieldData && (
				<form
					noValidate
					className={classes.root}
					onSubmit={handleSubmitOrder}
					autoComplete="off"
				>
					<Grid container>
						<Grid item className={classes.grid} xs={8}>
							<TextField
								value={fieldData.name.value}
								size="small"
								className={classes.textField}
								id="name"
								label="Brand Name"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={fieldData.code.value}
								size="small"
								className={classes.textField}
								id="code"
								label="Code"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={fieldData.price.value}
								onChange={handlePrice}
								size="small"
								className={classes.textField}
								id="price"
								label="Price"
								variant="outlined"
								type="number"
								required
								error={fieldData.price.hasError}
								helperText={fieldData.price.error}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={fieldData.cost.value}
								onChange={handleCost}
								size="small"
								className={classes.textField}
								id="cost"
								label="Cost"
								variant="outlined"
								type="number"
								required
								error={fieldData.cost.hasError}
								helperText={fieldData.cost.error}
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
								Save changes{" "}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</>
	);
};

export default ChangePriceAndCost;
