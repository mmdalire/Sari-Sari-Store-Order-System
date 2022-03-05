import React, { useState, useContext } from "react";

import AppBar from "@material-ui/core/AppBar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";

import { AuthContext } from "../../../context/auth-context";

import AvatarTemplate from "../UI/AvatarTemplate";

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
	const auth = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		auth.logout();
	};

	return (
		<AppBar className={classes.appbar} elevation={2}>
			<ToolBar>
				<Typography
					style={{
						width: "100%",
						textAlign: "right",
						marginRight: 10,
					}}
				>
					{auth.userFirstName} {auth.userLastName}
				</Typography>
				<AvatarTemplate
					data={{
						firstName: auth.userFirstName,
						lastName: auth.userLastName,
					}}
				/>

				<IconButton
					style={{ color: "white" }}
					onClick={handleClick}
					component="span"
				>
					<ArrowDropDownIcon />
				</IconButton>

				{/* Logout option */}
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
				>
					<MenuItem key="logout" onClick={handleLogout}>
						Logout
					</MenuItem>
				</Menu>
			</ToolBar>
		</AppBar>
	);
};

export default NavBar;
