import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			backgroundColor: blue[600],
			color: "white",
			width: `calc(100% - ${drawerWidth}px)`,
		},
		title: {
			flexGrow: 1,
		},
		avatar: {
			marginLeft: theme.spacing(2),
		},
	};
});

const NavBar = () => {
	const classes = useStyles();

	return (
		<AppBar className={classes.appbar} elevation>
			<ToolBar>
				<Typography className={classes.title}>
					Inventory System
				</Typography>
				<Typography>Test</Typography>
				<Avatar className={classes.avatar}>M</Avatar>
			</ToolBar>
		</AppBar>
	);
};

export default NavBar;
