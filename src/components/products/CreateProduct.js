import React, { useState } from "react";

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

import { formValid, generateCode } from "../../utils/utilities";

const DUMMY_CATEGORIES = [
	{
		code: "BIS",
		name: "BISCUIT",
	},
	{
		code: "CAN",
		name: "CANDY",
	},
	{
		code: "CGO",
		name: "CANNED GOODS",
	},
	{
		code: "CHI",
		name: "CHIPS",
	},
	{
		code: "DET",
		name: "DETERGENT",
	},
];

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

const CreateCustomer = (props) => {
	const classes = useStyles();

	const [fieldData, setFieldData] = useState({
		name: { value: "", hasError: false, hasTouched: false, error: "" },
		category: { value: "", hasError: false, hasTouched: false, error: "" },
		categoryName: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		code: { value: "", hasError: false, hasTouched: false, error: "" },
		description: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		type: {
			value: "countable",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		unit: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		price: { value: "", hasError: false, hasTouched: false, error: "" },
		cost: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		quantity: { value: "", hasError: false, hasTouched: false, error: "" },
	});
	const [isFormValid, setIsFormValid] = useState(false);

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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleDescription = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.description.value = e.target.value;
		newFieldData.description.hasTouched = true;

		if (!e.target.value) {
			newFieldData.description.hasError = true;
			newFieldData.description.error = "Description is required!";
		} else {
			newFieldData.description.hasError = false;
			newFieldData.description.error = "";
		}

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleType = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.type.value = e.target.value;

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleUnit = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.unit.value = e.target.value;

		if (!e.target.value) {
			newFieldData.unit.hasError = true;
			newFieldData.unit.error = "Unit is required!";
		} else {
			newFieldData.unit.hasError = false;
			newFieldData.unit.error = "";
		}

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

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

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handlePrice = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.price.value = parseFloat(e.target.value);
		newFieldData.price.hasTouched = true;

		if (!e.target.value) {
			newFieldData.price.hasError = true;
			newFieldData.price.error = "Price is required!";
		} else {
			newFieldData.price.hasError = false;
			newFieldData.price.error = "";
		}

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleCost = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.cost.value = parseFloat(e.target.value);
		newFieldData.cost.hasTouched = true;

		if (!e.target.value) {
			newFieldData.cost.hasError = true;
			newFieldData.cost.error = "Cost is required!";
		} else {
			newFieldData.cost.hasError = false;
			newFieldData.cost.error = "";
		}

		setIsFormValid(formValid(newFieldData));
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
		setIsFormValid(formValid(newFieldData));
	};

	const handleSubmitProduct = (e) => {
		e.preventDefault();

		if (isFormValid) {
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
				status: "UNUSED",
			};

			props.onSave(productData);
		}
	};

	return (
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
						{DUMMY_CATEGORIES.map((option) => {
							return (
								<MenuItem key={option.code} value={option.code}>
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
							!(fieldData.name.value && fieldData.category.value)
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
						required
						error={fieldData.description.hasError}
						helperText={fieldData.description.error}
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
											fieldData.type.value === "countable"
										}
									/>
								}
								label="Countable"
							/>
							<FormControlLabel
								value="mass"
								control={<Radio color="primary" />}
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
						error={fieldData.unit.hasError}
						helperText={fieldData.unit.error}
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
						className={classes.success}
						variant="contained"
						type="submit"
						disabled={!isFormValid}
						startIcon={<SaveIcon />}
					>
						{" "}
						Create Product{" "}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default CreateCustomer;
