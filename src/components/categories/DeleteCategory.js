import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		buttonSelection: {
			textAlign: "right",
		},
		danger: {
			backgroundColor: red[100],
			color: red[900],
			fontWeight: "bold",
		},
	};
});

const DeleteCategory = (props) => {
	const classes = useStyles();

	const handleCancel = () => {
		props.onCancel();
	};

	return (
		<div className={classes.root}>
			<Typography gutterBottom>
				Are you sure you want to delete this category?
			</Typography>

			<div className={classes.buttonSelection}>
				<Button
					variant="contained"
					className={classes.danger}
					style={{ marginRight: 10 }}
				>
					{" "}
					Yes{" "}
				</Button>
				<Button onClick={handleCancel} variant="contained">
					{" "}
					No{" "}
				</Button>
			</div>
		</div>
	);
};

export default DeleteCategory;
