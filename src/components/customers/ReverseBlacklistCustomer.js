import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

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

	const handleCancel = () => {
		props.onCancel();
	};

	return (
		<div className={classes.root}>
			<Typography gutterBottom>
				Are you sure you want to reverse blacklist this customer?
			</Typography>

			<div className={classes.buttonSelection}>
				<Button
					variant="contained"
					color="primary"
					style={{ marginRight: 10 }}
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
	);
};

export default ReverseBlacklistCustomer;
