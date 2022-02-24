import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

const ModalTemplate = (props) => {
	const useStyles = makeStyles((theme) => {
		return {
			root: {
				position: "absolute",
				top: props.top,
				left: props.left,
				width: props.width,
				backgroundColor: "#f9f9f9",
				boxShadow: theme.shadows[5],
				borderRadius: "5px",
				padding: theme.spacing(2, 2, 3),
			},
			header: {
				display: "flex",
			},
			title: {
				fontWeight: "bold",
			},
		};
	});

	const classes = useStyles(props);

	const handleCloseModal = () => {
		props.onClose(false);
	};

	const modalHeader = (
		<div style={{ display: "flex" }}>
			<div className={classes.header} style={{ flexGrow: 1 }}>
				{props.modalIcon}
				<Typography
					className={classes.title}
					color="primary"
					variant="h5"
				>
					{props.modalTitle}
				</Typography>
			</div>
			<div>
				<IconButton
					onClick={handleCloseModal}
					aria-label="close modal"
					component="span"
					size="small"
				>
					<CloseIcon />
				</IconButton>
			</div>
		</div>
	);

	return (
		<Modal
			open={props.open}
			onClose={handleCloseModal}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{ overflowY: "scroll" }}
		>
			<div className={classes.root}>
				{modalHeader}
				{props.children}
			</div>
		</Modal>
	);
};

export default ModalTemplate;
