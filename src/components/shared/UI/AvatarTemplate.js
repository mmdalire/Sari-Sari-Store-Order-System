import React from "react";

import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
	return {
		avatar: {
			backgroundColor: blue[700],
			color: "white",
		},
	};
});

const AvatarTemplate = (props) => {
	const classes = useStyles();

	return (
		<Avatar
			className={classes.avatar}
			style={{ margin: "auto" }}
		>{`${props.data.firstName[0]}${props.data.lastName[0]}`}</Avatar>
	);
};

export default AvatarTemplate;
