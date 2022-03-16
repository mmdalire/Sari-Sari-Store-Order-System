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

const RestockProduct = (props) => {
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
					code: {
						value: data.code,
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

	const handleQuantity = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.quantity.value = parseInt(e.target.value);
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

	const handleSubmitOrder = async (e) => {
		e.preventDefault();

		const productData = {
			quantity: fieldData.quantity.value,
			userId: auth.userId,
		};

		setReadingIsLoading(null); //To avoid displaying the error message in the form itself (editing errors must be in dialog)
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}/api/products/${auth.currentId}/restock`,
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
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={fieldData.quantity.value}
								onChange={handleQuantity}
								size="small"
								className={classes.textField}
								id="quantity"
								label="Quantity"
								variant="outlined"
								type="number"
								required
								error={fieldData.quantity.hasError}
								helperText={fieldData.quantity.error}
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

export default RestockProduct;
