import React from "react";

import { makeStyles } from "@material-ui/core";

import SideDrawer from "./SideDrawer";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => {
	return {
		page: {
			background: "#f9f9f9",
			width: "100%",
			padding: theme.spacing(3),
		},
		root: {
			display: "flex",
		},
		toolbar: theme.mixins.toolbar,
	};
});

const MainNavigation = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<NavBar />
			<SideDrawer />
			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{props.children}
			</div>
		</div>
	);
};

export default MainNavigation;
