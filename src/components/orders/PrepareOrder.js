import React, { useState } from "react";

import DynamicTable from "../shared/UI/DynamicTable";

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 100 },
	{ id: "name", label: "Brand Name", minWidth: 300 },
	{ id: "price", label: "Price" },
	{ id: "quantity", label: "Available Quantity" },
	{ id: "orderQuantity", label: "Order Quantity", minWidth: 0 },
	{ id: "subtotal", label: "Subtotal", minWidth: 100 },
	{ id: "deleteAction", label: "" },
];

const fieldErrors = {
	required: "Quantity is required!",
	notBeZero: "Quantoty must be greater than 0",
	greaterThanValue: "Quantity exceeds than the stock quantity",
};

const PrepareOrder = (props) => {
	return (
		<DynamicTable
			headers={tableHeaders}
			fieldErrors={fieldErrors}
			data={props.data}
			total={props.total}
			onNumberChange={props.onQuantityChange}
			onDelete={props.onDelete}
			edit={!!props.edit}
		/>
	);
};

export default PrepareOrder;
