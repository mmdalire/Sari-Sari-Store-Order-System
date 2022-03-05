import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(2),
			display: "flex",
			width: "100%",
			justifyContent: "center",
		},
	};
});

const Loading = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress color="primary" />
		</div>
	);
};

export default Loading;
