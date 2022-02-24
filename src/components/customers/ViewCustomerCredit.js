import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import ListingTable from "../shared/UI/ListingTable";

const DUMMY_DATA = [
	{ poNo: "PONO202202-0001", credit: 100, createddate: "2022-10-12" },
];

const tableHeaders = [
	{ id: "poNo", label: "Order Number" },
	{ id: "credit", label: "Credit" },
	{ id: "createddate", label: "Order Date" },
];

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

const ViewCustomerCredit = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Grid container>
				<Grid item className={classes.grid} xs={10}>
					<TextField
						value={100}
						size="small"
						className={classes.textField}
						id="total-credit"
						label="Total Credit"
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
						value="Active"
						size="small"
						className={classes.textField}
						id="status"
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
			</Grid>
			<ListingTable
				headers={tableHeaders}
				data={DUMMY_DATA}
				limit={10}
				page={1}
			/>
		</div>
	);
};

export default ViewCustomerCredit;
