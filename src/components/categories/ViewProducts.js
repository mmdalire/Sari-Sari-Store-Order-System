import React from "react";

import { makeStyles } from "@material-ui/core";

import ListingTable from "../shared/UI/ListingTable";

const tableHeaders = [
	{ id: "code", label: "Code" },
	{ id: "name", label: "Name" },
	{ id: "quantity", label: "Quantity" },
];

const useStyles = makeStyles((theme) => {
	return {
		textField: {
			width: "100%",
		},
		grid: {
			padding: theme.spacing(1),
		},
	};
});

const ViewCustomerCredit = (props) => {
	const classes = useStyles();

	return (
		<ListingTable
			headers={tableHeaders}
			data={props.data}
			limit={10}
			page={1}
		/>
	);
};

export default ViewCustomerCredit;
