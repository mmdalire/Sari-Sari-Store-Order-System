import React, { useContext } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import ErrorDialog from "../shared/UI/ErrorDialog";
import LoadingDialog from "../shared/UI/LoadingDialog";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		buttonSelection: {
			textAlign: "right",
		},
	};
});

const ReverseBlacklistCustomer = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const handleSubmit = async (e) => {
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}/api/customers/${auth.currentId}/reverseBlacklist`,
				"PATCH",
				null,
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			props.onClose(data.message);
		} catch (err) {}
	};

	const handleCancel = () => {
		props.onCancel();
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
			{!isLoading && !httpErrors && (
				<div className={classes.root}>
					<Typography gutterBottom>
						Are you sure you want to reverse blacklist this
						customer?
					</Typography>

					<div className={classes.buttonSelection}>
						<Button
							variant="contained"
							color="primary"
							style={{ marginRight: 10 }}
							onClick={handleSubmit}
						>
							{" "}
							Yes{" "}
						</Button>
						<Button onClick={handleCancel} variant="contained">
							{" "}
							No{" "}
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default ReverseBlacklistCustomer;
