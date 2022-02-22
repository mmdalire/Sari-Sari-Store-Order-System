import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const options = {
	customers: [
		{ id: "view", label: "View", activateIn: ["ACTIVE", "BLACKLISTED"] },
		{ id: "edit", label: "Edit", activateIn: ["ACTIVE", "BLACKLISTED"] },
		{
			id: "blacklist",
			label: "Blacklist customer",
			activateIn: ["ACTIVE"],
		},
		{
			id: "reverseBlacklist",
			label: "Reverse blacklist customer",
			activateIn: ["BLACKLISTED"],
		},
		{
			id: "delete",
			label: "Delete",
			activateIn: ["ACTIVE", "BLACKLISTED"],
		},
	],
	categories: [
		{ id: "edit", label: "Edit", activateIn: ["ACTIVE"] },
		{ id: "delete", label: "Delete", activateIn: ["ACTIVE"] },
	],
	products: [
		{ id: "view", label: "View", activateIn: ["ACTIVE"] },
		{ id: "edit", label: "Edit", activateIn: ["ACTIVE"] },
		{ id: "delete", label: "Delete", activateIn: ["ACTIVE"] },
	],
	orders: [
		{
			id: "view",
			label: "View",
			activateIn: ["DRAFT", "SUBMIT", "CANCELLED"],
		},
		{ id: "edit", label: "Edit", activateIn: ["DRAFT"] },
		{ id: "cancel", label: "Cancel", activateIn: ["DRAFT"] },
	],
	purchaseReturns: [
		{
			id: "view",
			label: "View",
			activateIn: ["ACTIVE"],
		},
	],
};

const OptionMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (e) => {
		console.log(e.currentTarget.dataset.option);
		setAnchorEl(null);
	};

	const optionsByStatus = options[props.entity].filter((option) =>
		option.activateIn.includes(props.status || "ACTIVE")
	);

	return (
		<div>
			<IconButton onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
			>
				{optionsByStatus.map((option) => (
					<MenuItem
						key={option.id}
						data-option={option.id}
						onClick={handleClose}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default OptionMenu;
