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
	const [value, setValue] = useState(props.edit ? props.originalValue : "");

	const handleTextChange = (e) => {
		setValue(e.target.value);

		if (!e.target.value) {
			setErrorField(props.fieldErrors.required);

			//Change quantity to 0 if no value passed and pass on to CreateOrder component
			props.onNumberChange(props.reference, "");
		} else {
			if (typeof props.value === "number") {
				props.onNumberChange(props.reference, parseInt(e.target.value));

				//Input is 0
				if (parseInt(e.target.value) === 0) {
					setErrorField(props.fieldErrors.notBeZero);
					return;
				}

				//Input is GREATER than the reference
				if (parseInt(props.value) < parseInt(e.target.value)) {
					setErrorField(props.fieldErrors.greaterThanValue);
					return;
				}

				setErrorField(null);
			}
		}
	};

	return (
		<TextField
			value={value}
			size="small"
			className={classes.textField}
			variant="outlined"
			onChange={props.onNumberChange && handleTextChange}
			inputProps={
				props.type === "number" && { style: { textAlign: "right" } }
			}
			error={!!errorField}
			helperText={errorField}
			disabled={props.disabled}
			readOnly={props.readOnly}
		/>
	);
};

export default DynamicTableTextField;
