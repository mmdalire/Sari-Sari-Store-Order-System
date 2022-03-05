import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

import ErrorDialog from "../shared/UI/ErrorDialog";
import LoadingDialog from "../shared/UI/LoadingDialog";
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
			backgroundColor: "white",
		},
		success: {
			backgroundColor: green[100],
			color: green[900],
			fontWeight: "bold",
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

const Register = (props) => {
	const classes = useStyles();

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();
	const [errors, setErrors] = useState(null);
	const [fieldData, setFieldData] = useState({
		firstName: { value: "", hasError: false, hasTouched: false, error: "" },
		lastName: { value: "", hasError: false, hasTouched: false, error: "" },
		middleInitial: {
			value: "",
			hasError: false,
			hasTouched: true,
			error: "",
		},
		email: { value: "", hasError: false, hasTouched: false, error: "" },
		phoneNumber: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		gender: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		birthYear: { value: "", hasError: false, hasTouched: false, error: "" },
		birthMonth: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
		birthDay: { value: "", hasError: false, hasTouched: false, error: "" },
		password: { value: "", hasError: false, hasTouched: false, error: "" },
		confirmPassword: {
			value: "",
			hasError: false,
			hasTouched: false,
			error: "",
		},
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const handleClearErrors = () => {
		setErrors(null);
		clearError();
	};

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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleGender = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.gender.value = e.target.value;
		newFieldData.gender.hasTouched = true;

		if (!e.target.value) {
			newFieldData.gender.hasError = true;
			newFieldData.gender.error = "Gender is required!";
		} else {
			newFieldData.gender.hasError = false;
			newFieldData.gender.error = "";
		}

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
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

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handlePassword = (e) => {
		const newFieldData = { ...fieldData };
		const MAX_CHARACTERS = 8;

		newFieldData.password.value = e.target.value;
		newFieldData.password.hasTouched = true;

		if (!e.target.value) {
			newFieldData.password.hasError = true;
			newFieldData.password.error = "Password is required!";
		}
		//The password must be at LEAST 8 characters
		else if (e.target.value.length < MAX_CHARACTERS) {
			newFieldData.password.hasError = true;
			newFieldData.password.error = `Password must be at least ${MAX_CHARACTERS} characters long!`;
		} else {
			newFieldData.password.hasError = false;
			newFieldData.password.error = "";
		}

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleConfirmPassword = (e) => {
		const newFieldData = { ...fieldData };
		newFieldData.confirmPassword.value = e.target.value;
		newFieldData.confirmPassword.hasTouched = true;

		if (!e.target.value) {
			newFieldData.confirmPassword.hasError = true;
			newFieldData.confirmPassword.error =
				"Confirm password is required!";
		} else {
			newFieldData.confirmPassword.hasError = false;
			newFieldData.confirmPassword.error = "";
		}

		setIsFormValid(formValid(newFieldData));
		setFieldData(newFieldData);
	};

	const handleSubmitRegister = async (e) => {
		e.preventDefault();

		//If the password is NOT the same as the confirm password
		if (fieldData.password.value !== fieldData.confirmPassword.value) {
			setErrors(
				"Your password and confirm password are not the same. Please check!"
			);
			return;
		}

		try {
			await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/users/signup`,
				"POST",
				JSON.stringify({
					firstName: fieldData.firstName.value,
					lastName: fieldData.lastName.value,
					middleInitial: fieldData.middleInitial.value,
					email: fieldData.email.value,
					phoneNumber: fieldData.phoneNumber.value,
					gender: fieldData.gender.value,
					birthdate: `${fieldData.birthYear.value}-${fieldData.birthMonth.value}-${fieldData.birthDay.value}`,
					password: fieldData.password.value,
				}),
				{
					"Content-Type": "application/json",
				}
			);

			props.onClose(
				"Successfully registered your account! Please login to access your account!"
			);
		} catch (err) {}
	};

	return (
		<>
			{/* Loading */}
			{isLoading && <LoadingDialog />}

			{/* Dialogs */}
			{(errors || httpErrors) && (
				<ErrorDialog
					open={!!(errors || httpErrors)}
					message={errors || httpErrors}
					onHandleClose={handleClearErrors}
				/>
			)}

			<form
				className={classes.root}
				onSubmit={handleSubmitRegister}
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
					<Grid item className={classes.grid} xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">Gender</FormLabel>
							<RadioGroup
								aria-label="type"
								name="type"
								value={fieldData.gender.value}
								onChange={handleGender}
								row
							>
								<FormControlLabel
									value="male"
									control={<Radio color="primary" />}
									label="Male"
								/>
								<FormControlLabel
									value="female"
									control={<Radio color="primary" />}
									label="Female"
								/>
							</RadioGroup>
						</FormControl>
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
							value={fieldData.password.value}
							onChange={handlePassword}
							size="small"
							type="password"
							className={classes.textField}
							id="password"
							label="Password"
							variant="outlined"
							required
							error={fieldData.password.hasError}
							helperText={fieldData.password.error}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={12}>
						<TextField
							value={fieldData.confirmPassword.value}
							onChange={handleConfirmPassword}
							size="small"
							type="password"
							className={classes.textField}
							id="confirm-password"
							label="Confirm Password"
							variant="outlined"
							required
							error={fieldData.confirmPassword.hasError}
							helperText={fieldData.confirmPassword.error}
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
							startIcon={<AddIcon />}
						>
							{" "}
							Register{" "}
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default Register;
