import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import EmailIcon from "@material-ui/icons/Email";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

import ModalTemplate from "../components/shared/UI/ModalTemplate";
import Register from "../components/login/Register";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex",
			alignContent: "center",
			justifyContent: "center",
			height: "100vh",
			background: blue[500],
		},
		grid: {
			marginBottom: 20,
		},
		card: {
			margin: theme.spacing(12, 0),
			padding: theme.spacing(2),
			width: 350,
		},
		cardHeader: {
			padding: theme.spacing(2, 3),
			textAlign: "center",
		},
		cardContent: {
			marginTop: -25,
		},
		textField: {
			width: "100%",
			backgroundColor: "white",
		},
	};
});

const registerModal = {
	operation: "add",
	top: 50,
	left: 320,
	width: 700,
	title: "Registration",
	icon: (
		<PersonAddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Login = (props) => {
	const classes = useStyles();

	const [warnings, setWarnings] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(registerModal);
	const [loginCredentials, setLoginCredentials] = useState({
		email: {
			value: "",
		},
		password: {
			value: "",
		},
	});

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleCloseModal = (message = "") => {
		if (message) {
			setWarnings(message);
		}

		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(registerModal);
		setOpenModal(true);
	};

	const handleEmail = (e) => {
		const newCredentials = { ...loginCredentials };

		newCredentials.email.value = e.target.value;
		setLoginCredentials(newCredentials);
	};

	const handlePassword = (e) => {
		const newCredentials = { ...loginCredentials };

		newCredentials.password.value = e.target.value;
		setLoginCredentials(newCredentials);
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		console.log({
			email: loginCredentials.email.value,
			password: loginCredentials.password.value,
		});

		const token = Math.random() * 1000;
		const userId = "Some user ID";

		props.onLogin(token, userId);
	};

	return (
		<>
			{/* Snackbars */}
			{warnings && (
				<SnackbarTemplate
					open={!!warnings}
					type="success"
					message={warnings}
					onHandleClose={handleClearWarnings}
				/>
			)}

			{/* Modals */}
			<ModalTemplate
				open={openModal}
				onClose={handleCloseModal}
				top={modalConfig.top}
				left={modalConfig.left}
				width={modalConfig.width}
				modalTitle={modalConfig.title}
				modalIcon={modalConfig.icon}
			>
				<Register onClose={handleCloseModal} />
			</ModalTemplate>

			<form
				noValidate
				autoComplete="off"
				onSubmit={handleLoginSubmit}
				className={classes.root}
			>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title={
							<Typography
								variant="h5"
								color="primary"
								style={{ fontWeight: "bold", marginBottom: 30 }}
							>
								Sari-Sari Store Order System
							</Typography>
						}
					/>
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={12}>
								<TextField
									type="email"
									size="small"
									className={classes.textField}
									id="email"
									label="Email"
									onChange={handleEmail}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<EmailIcon color="primary" />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item className={classes.grid} xs={12}>
								<TextField
									type="password"
									size="small"
									className={classes.textField}
									id="password"
									label="Password"
									onChange={handlePassword}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<VpnKeyIcon color="primary" />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid
								item
								className={classes.grid}
								style={{ textAlign: "center" }}
								xs={12}
							>
								<Button
									type="submit"
									style={{ width: "100%", marginBottom: 15 }}
									disabled={
										!(
											loginCredentials.email.value &&
											loginCredentials.password.value
										)
									}
									color="primary"
									variant="contained"
								>
									SIGN IN
								</Button>
							</Grid>
							<Grid
								item
								className={classes.grid}
								style={{ textAlign: "center" }}
								xs={12}
							>
								<Typography>
									Don't have an account yet?
								</Typography>
								<Button
									href=""
									onClick={handleModalConfigCreate}
									color="primary"
								>
									Sign Up now!
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</form>
		</>
	);
};

export default Login;
