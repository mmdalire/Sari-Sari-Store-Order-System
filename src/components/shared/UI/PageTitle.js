import React from "react";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CategoryIcon from "@material-ui/icons/Category";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	icon: {
		fontSize: "40px",
		marginRight: "10px",
	},
	title: {
		fontWeight: "bold",
	},
});

const PageTitle = (props) => {
	const classes = useStyles();

	//Set icon for each page
	let icon;
	switch (props.title) {
		case "About":
			icon = <InfoIcon color="primary" className={classes.icon} />;
			break;
		case "Customers":
			icon = <PeopleIcon color="primary" className={classes.icon} />;
			break;
		case "Categories":
			icon = <CategoryIcon color="primary" className={classes.icon} />;
			break;
		case "Dashboard":
			icon = <DashboardIcon color="primary" className={classes.icon} />;
			break;
		case "Products":
			icon = <StorefrontIcon color="primary" className={classes.icon} />;
			break;
		case "Orders":
			icon = (
				<ShoppingCartIcon color="primary" className={classes.icon} />
			);
			break;
		case "Purchase Returns":
			icon = (
				<AssignmentReturnIcon
					color="primary"
					className={classes.icon}
				/>
			);
			break;
		case "Inventory":
			icon = (
				<AssignmentTurnedInIcon
					color="primary"
					className={classes.icon}
				/>
			);
			break;
	}

	return (
		<div style={{ display: "flex", marginBottom: "10px" }}>
			{icon}
			<Typography
				variant="h4"
				color="primary"
				className={classes.title}
				gutterBottom
			>
				{props.title}
			</Typography>
		</div>
	);
};

export default PageTitle;
