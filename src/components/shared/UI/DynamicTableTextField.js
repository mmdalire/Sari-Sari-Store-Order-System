import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	textField: {
		width: "100%",
	},
});

const DynamicTableTextField = (props) => {
	const classes = useStyles();

	const [errorField, setErrorField] = useState(null);

	const handleTextChange = (e) => {
		if (!e.target.value) {
			setErrorField(props.fieldErrors.required);

			//Change quantity to 0 if no value passed and pass on to CreateOrder component
			props.onNumberChange(props.reference, "");
		} else {
			if (props.type === "number") {
				props.onNumberChange(props.reference, parseInt(e.target.value));

				//Input is 0
				if (parseInt(e.target.value) <= 0) {
					setErrorField(props.fieldErrors.notBeZero);
					return;
				}

				//Input is GREATER than the reference
				if (parseInt(props.originalValue) < parseInt(e.target.value)) {
					setErrorField(props.fieldErrors.greaterThanValue);
					return;
				}

				props.onNumberChange(props.reference, parseInt(e.target.value));
				setErrorField(null);
			}
		}
	};

	return (
		<TextField
			value={props.value || ""}
			type={props.type}
			size="small"
			className={classes.textField}
			variant="outlined"
			onChange={handleTextChange}
			error={!!errorField}
			helperText={errorField}
			disabled={props.disabled}
			readOnly={props.readOnly}
		/>
	);
};

export default DynamicTableTextField;
