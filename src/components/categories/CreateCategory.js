import React, { useState, useContext } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import ErrorDialog from "../shared/UI/ErrorDialog";
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

const CreateCategory = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [fieldData, setFieldData] = useState({
		name: { value: "", hasError: false, hasTouched: false, error: "" },
		code: { value: "", hasError: false, hasTouched: false, error: "" },
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleName = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.name.hasTouched = true;
		newFieldData.name.value = e.target.value;

		if (!e.target.value) {
			newFieldData.name.hasError = true;
			newFieldData.name.error = "Category name is required!";
		} else {
			newFieldData.name.hasError = false;
			newFieldData.name.error = "";
		}

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData));
	};

	const handleCode = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.code.hasTouched = true;
		newFieldData.code.value = e.target.value;

		if (!e.target.value) {
			newFieldData.code.hasError = true;
			newFieldData.code.error = "Category code is required!";
		} else {
			newFieldData.code.hasError = false;
			newFieldData.code.error = "";
		}

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData));
	};

	const handleGenerateCode = () => {
		const newFieldData = { ...fieldData };
		newFieldData.code.value = generateCode(fieldData.name.value);
		newFieldData.code.hasTouched = true;
		newFieldData.code.hasError = false;
		newFieldData.code.error = "";

		setFieldData(newFieldData);
		setIsFormValid(formValid(newFieldData));
	};

	const handleSubmitCategory = async (e) => {
		e.preventDefault();

		const categoryData = {
			code: fieldData.code.value,
			name: fieldData.name.value,
			userId: auth.userId,
		};

		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}/api/categories`,
				"POST",
				JSON.stringify(categoryData),
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose("Successfully created category!");
		} catch (err) {}
	};

	return (
		<>
			{isLoading && <LoadingDialog />}
			{!isLoading && httpErrors && (
				<ErrorDialog
					open={!!httpErrors}
					message={httpErrors}
					onHandleClose={clearError}
				/>
			)}
			{!isLoading && (
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
								className={classes.success}
								variant="contained"
								type="submit"
								disabled={!isFormValid}
								startIcon={<SaveIcon />}
							>
								{" "}
								Create Category{" "}
							</Button>
						</Grid>
					</Grid>
				</form>
			)}
		</>
	);
};

export default CreateCategory;
