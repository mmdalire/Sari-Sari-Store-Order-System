import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import { formValid } from "../../utils/utilities";

const DUMMY_DATA = {
	customerNo: "CRM202202-0001",
	lastName: "TEST1",
	firstName: "TEST1L",
	middleInitial: "A",
	phoneNumber: "11112223333",
	email: "email@email.com",
	address: "Some address at this address",
	birthDate: "2021-12-12",
	status: "ACTIVE",
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

const birthOptions = {
	year: function () {
		let startYear = 1970;
		let endYear = new Date().getFullYear();
		const yearRange = [];

		for (let i = endYear; i > startYear; i--) {
			yearRange.push({ value: i, label: i });
		}
		return yearRange;
	},
	month: [
		{ value: "01", label: "January" },
		{ value: "02", label: "February" },
		{ value: "03", label: "March" },
		{ value: "04", label: "April" },
		{ value: "05", label: "May" },
		{ value: "06", label: "June" },
		{ value: "07", label: "July" },
		{ value: "08", label: "August" },
		{ value: "09", label: "September" },
		{ value: "10", label: "October" },
		{ value: "11", label: "November" },
		{ value: "12", label: "December" },
	],
	day: function () {
		let startDay = 1;
		let endDay = 31;
		const dayRange = [];

		for (let i = startDay; i <= endDay; i++) {
			dayRange.push({ value: String(i).padStart(2, "0"), label: i });
		}
		return dayRange;
	},
};

const EditCustomer = (props) => {
	const classes = useStyles();

	const [fieldData, setFieldData] = useState({
		firstName: {
			value: DUMMY_DATA.firstName,
			hasError: false,
			error: "",
		},
		lastName: {
			value: DUMMY_DATA.lastName,
			hasError: false,
			error: "",
		},
		middleInitial: {
			value: DUMMY_DATA.middleInitial,
			hasError: false,
			hasTouched: true,
			error: "",
		},
		email: {
			value: DUMMY_DATA.email,
			hasError: false,
			error: "",
		},
		phoneNumber: {
			value: "",
			hasError: false,
			error: "",
		},
		birthYear: {
			value: DUMMY_DATA.birthDate.split("-")[0],
			hasError: false,
			error: "",
		},
		birthMonth: {
			value: DUMMY_DATA.birthDate.split("-")[1],
			hasError: false,
			error: "",
		},
		birthDay: {
			value: DUMMY_DATA.birthDate.split("-")[2],
			hasError: false,
			error: "",
		},
		address: {
			value: DUMMY_DATA.address,
			hasError: false,
			error: "",
		},
	});
	const [isFormValid, setIsFormValid] = useState(true);

	const handleFirstName = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.firstName.value = e.target.value;
		newFieldData.firstName.hasTouched = true;

		if (!e.target.value) {
			newFieldData.firstName.hasError = true;
			newFieldData.firstName.error = "First name is required!";
		} else {
			newFieldData.firstName.hasError = false;
			newFieldData.firstName.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleLastName = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.lastName.value = e.target.value;
		newFieldData.lastName.hasTouched = true;

		if (!e.target.value) {
			newFieldData.lastName.hasError = true;
			newFieldData.lastName.error = "Last name is required!";
		} else {
			newFieldData.lastName.hasError = false;
			newFieldData.lastName.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleMiddleInitial = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.middleInitial.value = e.target.value;
		newFieldData.middleInitial.hasTouched = true;

		setFieldData(newFieldData);
	};

	const handleEmail = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.email.value = e.target.value;
		newFieldData.email.hasTouched = true;

		if (!e.target.value) {
			newFieldData.email.hasError = true;
			newFieldData.email.error = "Email is required!";
		} else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
			newFieldData.email.hasError = true;
			newFieldData.email.error = "Must be a valid email!";
		} else {
			newFieldData.email.hasError = false;
			newFieldData.email.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handlePhoneNumber = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.phoneNumber.hasTouched = true;

		if (!e.target.value) {
			newFieldData.phoneNumber.hasError = true;
			newFieldData.phoneNumber.error = "Phone number is required!";
			newFieldData.phoneNumber.value = "";
		} else if (/^[0-9\b]+$/.test(e.target.value)) {
			newFieldData.phoneNumber.value = e.target.value;
			newFieldData.phoneNumber.hasError = false;
			newFieldData.phoneNumber.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleBirthMonth = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.birthMonth.hasTouched = true;

		if (!e.target.value) {
			newFieldData.birthMonth.value = "";
			newFieldData.birthMonth.hasError = true;
			newFieldData.birthMonth.error = "Birth month is required!";
		} else {
			newFieldData.birthMonth.value = String(e.target.value).padStart(
				2,
				"0"
			);
			newFieldData.birthMonth.hasError = false;
			newFieldData.birthMonth.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleBirthDay = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.birthDay.hasTouched = true;

		if (!e.target.value) {
			newFieldData.birthDay.value = "";
			newFieldData.birthDay.hasError = true;
			newFieldData.birthDay.error = "Birth day is required!";
		} else {
			newFieldData.birthDay.value = String(e.target.value).padStart(
				2,
				"0"
			);
			newFieldData.birthDay.hasError = false;
			newFieldData.birthDay.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleBirthYear = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.birthYear.value = e.target.value;
		newFieldData.birthYear.hasTouched = true;

		if (!e.target.value) {
			newFieldData.birthYear.hasError = true;
			newFieldData.birthYear.error = "Birth year is required!";
		} else {
			newFieldData.birthYear.hasError = false;
			newFieldData.birthYear.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleAddress = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.address.value = e.target.value;
		newFieldData.address.hasTouched = true;

		if (!e.target.value) {
			newFieldData.address.hasError = true;
			newFieldData.address.error = "Address is required!";
		} else {
			newFieldData.address.hasError = false;
			newFieldData.address.error = "";
		}

		setIsFormValid(formValid(newFieldData, false));
		setFieldData(newFieldData);
	};

	const handleSubmitCustomer = (e) => {
		e.preventDefault();

		if (isFormValid) {
			const customerData = {
				firstName: fieldData.firstName.value,
				lastName: fieldData.lastName.value,
				middleInitial: fieldData.middleInitial.value,
				email: fieldData.email.value,
				phoneNumber: fieldData.phoneNumber.value,
				birthDate: `${fieldData.birthYear.value}-${fieldData.birthMonth.value}-${fieldData.birthDay.value}`,
				address: fieldData.address.value,
				status: "ACTIVE",
				customerNo: Math.ceil(Math.random() * 10000),
			};

			props.onSave(customerData);
		}
	};

	return (
		<form
			className={classes.root}
			onSubmit={handleSubmitCustomer}
			noValidate
			autoComplete="off"
		>
			<Grid container>
				<Grid item className={classes.grid} xs={5}>
					<TextField
						value={fieldData.firstName.value}
						onChange={handleFirstName}
						size="small"
						className={classes.textField}
						id="first-name"
						label="First Name"
						variant="outlined"
						required
						error={fieldData.firstName.hasError}
						helperText={fieldData.firstName.error}
					/>
				</Grid>
				<Grid item className={classes.grid} xs={5}>
					<TextField
						value={fieldData.lastName.value}
						onChange={handleLastName}
						size="small"
						className={classes.textField}
						id="last-name"
						label="Last Name"
						variant="outlined"
						required
						error={fieldData.lastName.hasError}
						helperText={fieldData.lastName.error}
					/>
				</Grid>
				<Grid item className={classes.grid} xs={2}>
					<TextField
						value={fieldData.middleInitial.value}
						onChange={handleMiddleInitial}
						size="small"
						className={classes.textField}
						id="middle-initial"
						label="M.I."
						variant="outlined"
					/>
				</Grid>
				<Grid item className={classes.grid} xs={6}>
					<TextField
						value={fieldData.email.value}
						onChange={handleEmail}
						size="small"
						className={classes.textField}
						id="email"
						label="Email"
						variant="outlined"
						type="email"
						required
						error={fieldData.email.hasError}
						helperText={fieldData.email.error}
					/>
				</Grid>
				<Grid item className={classes.grid} xs={6}>
					<TextField
						value={fieldData.phoneNumber.value}
						onChange={handlePhoneNumber}
						size="small"
						className={classes.textField}
						id="phone-number"
						label="Phone number"
						variant="outlined"
						required
						error={fieldData.phoneNumber.hasError}
						helperText={fieldData.phoneNumber.error}
					/>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<TextField
						value={fieldData.birthMonth.value}
						onChange={handleBirthMonth}
						size="small"
						className={classes.textField}
						select
						label="Birth month"
						variant="outlined"
						required
						error={fieldData.birthMonth.hasError}
						helperText={fieldData.birthMonth.error}
					>
						{birthOptions.month.map((option) => {
							return (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							);
						})}
					</TextField>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<TextField
						value={fieldData.birthDay.value}
						onChange={handleBirthDay}
						size="small"
						className={classes.textField}
						select
						label="Birth day"
						variant="outlined"
						required
						error={fieldData.birthDay.hasError}
						helperText={fieldData.birthDay.error}
					>
						{birthOptions.day().map((option) => {
							return (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							);
						})}
					</TextField>
				</Grid>
				<Grid item className={classes.grid} xs={4}>
					<TextField
						value={fieldData.birthYear.value}
						onChange={handleBirthYear}
						size="small"
						className={classes.textField}
						select
						label="Birth year"
						variant="outlined"
						required
						error={fieldData.birthYear.hasError}
						helperText={fieldData.birthYear.error}
					>
						{birthOptions.year().map((option) => {
							return (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							);
						})}
					</TextField>
				</Grid>
				<Grid item className={classes.grid} xs={12}>
					<TextField
						value={fieldData.address.value}
						onChange={handleAddress}
						size="small"
						multiline
						rows={2}
						className={classes.textField}
						id="address"
						label="Address"
						variant="outlined"
						required
						error={fieldData.address.hasError}
						helperText={fieldData.address.error}
					/>
				</Grid>

				<Grid
					item
					className={classes.grid}
					style={{ textAlign: "right" }}
					xs={12}
				>
					<Button
						variant="contained"
						type="submit"
						disabled={!isFormValid}
						color="secondary"
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

export default EditCustomer;
