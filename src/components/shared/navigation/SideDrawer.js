import React from "react";
import { useNavigate } from "react-router-dom";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CategoryIcon from "@material-ui/icons/Category";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Drawer from "@material-ui/core/Drawer";
import InfoIcon from "@material-ui/icons/Info";
import PeopleIcon from "@material-ui/icons/People";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/styles";
import { amber, blue } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		drawer: {
			width: drawerWidth,
		},
		drawerPaper: {
			width: drawerWidth,
			background: blue[600],
			color: "white",
		},
		title: {
			padding: theme.spacing(2),
			textAlign: "center",
		},
		listItem: {
			"&:hover": {
				backgroundColor: amber[300],
			},
		},
	};
});

const menuItems = [
	{
		text: "Dashboard",
		icon: <DashboardIcon color="secondary" />,
		path: "/dashboard",
	},
	{
		text: "Customers",
		icon: <PeopleIcon color="secondary" />,
		path: "/customers",
	},
	{
		text: "Categories",
		icon: <CategoryIcon color="secondary" />,
		path: "/categories",
	},
	{
		text: "Products",
		icon: <StorefrontIcon color="secondary" />,
		path: "/products",
	},
	{
		text: "Orders",
		icon: <ShoppingCartIcon color="secondary" />,
		path: "/orders",
	},
	{
		text: "Purchase Returns",
		icon: <AssignmentReturnIcon color="secondary" />,
		path: "/purchase_returns",
	},
	{
		text: "Inventory",
		icon: <AssignmentTurnedInIcon color="secondary" />,
		path: "/inventory",
	},
	{
		text: "About",
		icon: <InfoIcon color="secondary" />,
		path: "/about",
	},
];

const SideDrawer = () => {
	const navigate = useNavigate();
	const classes = useStyles();

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			anchor="left"
			classes={{ paper: classes.drawerPaper }}
		>
			<div className="">
				<Typography variant="h5" className={classes.title}>
					Sari-Sari Order System
				</Typography>
			</div>

			<List>
				{menuItems.map((menu) => (
					<ListItem
						className={classes.listItem}
						button
						key={menu.text}
						onClick={() => navigate(menu.path)}
					>
						<ListItemIcon>{menu.icon}</ListItemIcon>
						<ListItemText primary={menu.text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default SideDrawer;
