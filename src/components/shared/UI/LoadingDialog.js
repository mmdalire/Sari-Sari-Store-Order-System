import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		dialogContent: {
			padding: theme.spacing(3),
			width: 300,
			display: "flex",
			alignContent: "center",
			justifyContent: "center",
		},
	};
});

const LoadingDialog = () => {
	const classes = useStyles();

	return (
		<Dialog open={true}>
			<DialogContent className={classes.dialogContent}>
				<CircularProgress color="primary" />
			</DialogContent>
		</Dialog>
	);
};

export default LoadingDialog;
