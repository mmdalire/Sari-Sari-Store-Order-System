import React, { useState, useEffect, useContext } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
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
		},
		success: {
			backgroundColor: green[100],
			color: green[900],
			fontWeight: "bold",
		},
	};
});

const EditCategory = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [fieldData, setFieldData] = useState(null);
	const [isFormValid, setIsFormValid] = useState(true);
	const [readingIsLoading, setReadingIsLoading] = useState(null);

	useEffect(() => {
		const loadCategory = async () => {
			setReadingIsLoading(true); //Activate loading spinner on the card ITSELF
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/categories/${auth.currentId}/products`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setFieldData({
					code: {
						value: data.info.code,
						hasError: false,
						error: "",
					},
					name: {
						value: data.info.name,
						hasError: false,
						error: "",
					},
				});
			} catch (err) {}

			setReadingIsLoading(false); //Deactivate loading spinner on the card ITSELF
		};

		loadCategory();
	}, []);

	const handleName = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.name.value = e.target.value;

		if (!e.target.value) {
			newFieldData.name.hasError = true;
			newFieldData.name.error = "Category name is required!";
		} else {
			newFieldData.name.hasError = false;
			newFieldData.name.error = "";
		}

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData, false));
	};

	const handleCode = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.code.value = e.target.value;

		if (!e.target.value) {
			newFieldData.code.hasError = true;
			newFieldData.code.error = "Category code is required!";
		} else {
			newFieldData.code.hasError = false;
			newFieldData.code.error = "";
		}

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData, false));
	};

	const handleGenerateCode = () => {
		const newFieldData = { ...fieldData };
		newFieldData.code.value = generateCode(fieldData.name.value);
		newFieldData.code.hasTouched = true;
		newFieldData.code.hasError = false;
		newFieldData.code.error = "";

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData, false));
	};

	const handleSubmitCategory = async (e) => {
		e.preventDefault();

		const categoryData = {
			code: fieldData.code.value,
			name: fieldData.name.value,
			userId: auth.userId,
		};

		setReadingIsLoading(null); //To avoid displaying the error message in the form itself (editing errors must be in dialog)
		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/categories/${auth.currentId}`,
				"PATCH",
				JSON.stringify(categoryData),
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
			{!readingIsLoading && !httpErrors && fieldData && (
				<form
					noValidate
					className={classes.root}
					onSubmit={handleSubmitCategory}
					autoComplete="off"
				>
					<Grid container>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={fieldData.name.value}
								onChange={handleName}
								size="small"
								className={classes.textField}
								id="name"
								label="Category Name"
								variant="outlined"
								required
								error={fieldData.name.hasError}
								helperText={fieldData.name.error}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={10}>
							<TextField
								value={fieldData.code.value}
								onChange={handleCode}
								size="small"
								className={classes.textField}
								id="code"
								label="Assign Code"
								variant="outlined"
								required
								error={fieldData.code.hasError}
								helperText={fieldData.code.error}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={2}>
							<Button
								type="button"
								disabled={!fieldData.name.value}
								onClick={handleGenerateCode}
								color="primary"
								variant="contained"
							>
								<OfflineBoltIcon />
							</Button>
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

export default EditCategory;
