import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const OptionMenu = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (e) => {
		if (e.currentTarget.dataset.option) {
			//Pass modal config to the modal template
			const indexOfOperation = props.availableMenu.findIndex(
				(option) => option.id === e.currentTarget.dataset.option
			);
			const modalConfig =
				props.availableMenu[indexOfOperation].modalConfig;
			props.onHandleModalConfig({
				...modalConfig,
				operation: e.currentTarget.dataset.option,
			});
		} else {
			props.onHandleModalConfig({});
		}
		setAnchorEl(null);
	};

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
				{props.availableMenu
					// Filter options based on the current status
					.filter((option) => {
						//If status is irrelevant, display ALL options for that page
						if (!props.status) {
							return true;
						}
						//If the options are dependent on the status of a record
						return option.activateIn.includes(props.status);
					})
					//Iterate each menu
					.map((option) => (
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
