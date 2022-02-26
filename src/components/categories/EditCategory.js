import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import { formValid, generateCode } from "../../utils/utilities";

const DUMMY_DATA = {
	code: "BIS",
	name: "BISCUIT",
	status: "IN-USE",
};

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

	const [fieldData, setFieldData] = useState({
		name: { value: DUMMY_DATA.name, hasError: false, error: "" },
		code: { value: DUMMY_DATA.code, hasError: false, error: "" },
	});
	const [isFormValid, setIsFormValid] = useState(true);

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

	const handleSubmitCategory = (e) => {
		e.preventDefault();

		if (isFormValid) {
			const categoryData = {
				code: fieldData.code.value,
				name: fieldData.name.value,
				status: "UNUSED",
			};

			props.onSave(categoryData);
		}
	};

	return (
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
	);
};

export default EditCategory;
