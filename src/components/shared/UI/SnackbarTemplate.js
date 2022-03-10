import React from "react";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const SnackbarTemplate = (props) => {
	return (
		<Snackbar
			open={props.open}
			autoHideDuration={props.duration || 7000}
			onClose={props.onHandleClose}
		>
			<MuiAlert
				variant="filled"
				onClose={props.onHandleClose}
				severity={props.type}
			>
				{props.message}
			</MuiAlert>
		</Snackbar>
	);
};

export default SnackbarTemplate;
