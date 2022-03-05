import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(2),
			width: "100%",
			display: "flex",
			alignContent: "center",
			justifyContent: "center",
		},
		icon: {
			margin: theme.spacing(0, 1),
			color: "gray",
		},
	};
});

const EmptyContainer = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<span className={classes.icon}>{props.icon}</span>
			<Typography variant="h6" style={{ color: "gray" }}>
				{props.message}
			</Typography>
		</div>
	);
};

export default EmptyContainer;
