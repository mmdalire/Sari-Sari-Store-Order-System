import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import { formValid, generateCode } from "../../utils/utilities";

const DUMMY_DATA = {
	code: "PRD1",
	name: "PRODUCT 1",
	categoryName: "CATEGORY 1",
	category: "BIS",
	description: "Some description",
	type: "MASS",
	unit: "PCS",
	price: 10,
	cost: 20,
	quantity: 20,
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
	};
});

const EditCategory = (props) => {
	const classes = useStyles();

	const [fieldData, setFieldData] = useState({
		quantity: {
			value: DUMMY_DATA.quantity,
			hasError: false,
			hasTouched: true,
			error: "",
		},
	});
	const [isFormValid, setIsFormValid] = useState(true);

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

	const handleSubmitCategory = (e) => {
		e.preventDefault();

		if (isFormValid) {
			const categoryData = {};

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
				<Grid item className={classes.grid} xs={8}>
					<TextField
						value={DUMMY_DATA.name}
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
						value={DUMMY_DATA.code}
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
	);
};

export default EditCategory;
