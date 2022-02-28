import React, { useState } from "react";

import FilterForm from "../shared/form/FilterForm";
import ListingTable from "../shared/UI/ListingTable";

const DUMMY_ROWS = [
	{
		code: "PRD1",
		name: "PRODUCT 1",
		category: "CATEGORY 1",
		unit: "PCS",
		price: 10,
		cost: 20,
		quantity: 20,
		status: "IN-USE",
	},
	{
		code: "PRD2",
		name: "PRODUCT 2",
		category: "CATEGORY 2",
		unit: "PCS",
		price: 15,
		cost: 25,
		quantity: 25,
		status: "IN-USE",
	},
	{
		code: "PRD3",
		name: "PRODUCT 3",
		category: "CATEGORY 3",
		unit: "PCS",
		price: 20,
		cost: 30,
		quantity: 30,
		status: "UNUSED",
	},
];

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "name", label: "Name" },
	{ value: "code", label: "Code" },
	{ value: "quantity", label: "Quantity" },
	{ value: "price", label: "Price" },
	{ value: "cost", label: "Cost" },
	{ value: "category", label: "Category" },
];

const tableHeaders = [
	{ id: "code", label: "Product code" },
	{ id: "name", label: "Name", minWidth: 150 },
	{ id: "category", label: "Category" },
	{ id: "unit", label: "Unit" },
	{ id: "price", label: "Price" },
	{ id: "cost", label: "Cost" },
	{ id: "quantity", label: "Quantity" },
	{ id: "selectProduct", label: "" },
];

const SelectProduct = (props) => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);

	const handleFilter = (filters) => {
		console.log(filters);
		setFilter(filters);
	};

	const handleLimit = (limit) => {
		setLimit(limit);
		setPage(1);
	};

	const handlePage = (page) => {
		setPage(page);
	};

	const handleSelect = (selectProduct) => {
		props.onHandleSelect(selectProduct);
	};

	return (
		<div style={{ marginTop: "10px" }}>
			<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
			<ListingTable
				headers={tableHeaders}
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
				onHandleSelect={handleSelect}
			/>
		</div>
	);
};

export default SelectProduct;
