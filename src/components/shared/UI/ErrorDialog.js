import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		dialogContent: {
			width: "500px",
		},
	};
});

const ErrorDialog = (props) => {
	const classes = useStyles();

	const handleCloseDialog = () => {
		props.onHandleClose(false);
	};

	return (
		<Dialog open={props.open} onClose={handleCloseDialog}>
			{props.title && <DialogTitle>{props.title}</DialogTitle>}
			<DialogContent className={classes.dialogContent}>
				{props.message}
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={handleCloseDialog}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ErrorDialog;
