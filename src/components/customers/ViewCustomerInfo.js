import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import EmptyContainer from "../shared/UI/EmptyContainer";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => {
	return {
		textField: {
			width: "100%",
		},
		grid: {
			padding: theme.spacing(1),
		},
	};
});

const ViewCustomerInfo = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);

	useEffect(() => {
		const loadCustomerInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}/api/customers/${auth.currentId}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setViewData(data);
			} catch (err) {}
		};

		loadCustomerInfo();
	}, []);

	return (
		<Grid className={classes.root} container>
			{isLoading && <Loading />}
			{!isLoading && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!isLoading && !httpErrors && viewData && (
				<>
					<Grid item className={classes.grid} xs={10}>
						<TextField
							value={viewData.customerNo}
							size="small"
							className={classes.textField}
							id="customer-number"
							label="Customer Number"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={2}>
						<TextField
							value={
								viewData.isBlacklisted
									? "BLACKLISTED"
									: "ACTIVE"
							}
							size="small"
							className={classes.textField}
							id="customer-status"
							label="Customer Status"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={5}>
						<TextField
							value={viewData.firstName}
							size="small"
							className={classes.textField}
							id="first-name"
							label="First Name"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={5}>
						<TextField
							value={viewData.lastName}
							size="small"
							className={classes.textField}
							id="last-name"
							label="Last Name"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={2}>
						<TextField
							value={viewData.middleInitial}
							size="small"
							className={classes.textField}
							id="middle-initial"
							label="MI"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={4}>
						<TextField
							value={viewData.email}
							size="small"
							className={classes.textField}
							id="email"
							label="Email"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={4}>
						<TextField
							value={viewData.phoneNumber}
							size="small"
							className={classes.textField}
							id="phone-number"
							label="Phone number"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={4}>
						<TextField
							value={moment(viewData.birthdate).format(
								"MMMM D, YYYY"
							)}
							size="small"
							className={classes.textField}
							id="birthdate"
							label="Birthdate"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={12}>
						<TextField
							value={viewData.address}
							size="small"
							className={classes.textField}
							id="address"
							label="Address"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							multiline
							rows={4}
						/>
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default ViewCustomerInfo;
