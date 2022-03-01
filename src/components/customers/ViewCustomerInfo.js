import React from "react";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

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

const ViewCustomerInfo = (props) => {
	const classes = useStyles();

	return (
		<Grid className={classes.root} container>
			<Grid item className={classes.grid} xs={12}>
				<TextField
					value={props.data.customerNo}
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
			<Grid item className={classes.grid} xs={5}>
				<TextField
					value={props.data.firstName}
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
					value={props.data.lastName}
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
					value={props.data.middleInitial}
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
					value={props.data.email}
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
					value={props.data.phoneNumber}
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
					value={moment(props.data.birthDate).format("MMMM D, YYYY")}
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
					value={props.data.address}
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
		</Grid>
	);
};

export default ViewCustomerInfo;
