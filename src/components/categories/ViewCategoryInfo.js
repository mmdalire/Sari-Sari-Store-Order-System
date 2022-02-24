import React from "react";

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
			<Grid item className={classes.grid} xs={6}>
				<TextField
					value={props.data.code}
					size="small"
					className={classes.textField}
					id="code"
					label="Code"
					variant="outlined"
					InputProps={{
						readOnly: true,
					}}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item className={classes.grid} xs={6}>
				<TextField
					value={props.data.name}
					size="small"
					className={classes.textField}
					id="name"
					label="Category Name"
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
	);
};

export default ViewCustomerInfo;
