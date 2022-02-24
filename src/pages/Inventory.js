import React, { useState } from "react";

import Container from "@material-ui/core/Container";

import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import PageTitle from "../components/shared/UI/PageTitle";

const DUMMY_ROWS = [
	{
		code: "PRD1",
		name: "PRODUCT 1",
		category: "CATEGORY 1",
		unit: "PCS",
		price: 10,
		cost: 20,
		quantity: 20,
		status: "ACTIVE",
	},
	{
		code: "PRD2",
		name: "PRODUCT 2",
		category: "CATEGORY 2",
		unit: "PCS",
		price: 15,
		cost: 25,
		quantity: 25,
		status: "INACTIVE",
	},
	{
		code: "PRD3",
		name: "PRODUCT 3",
		category: "CATEGORY 3",
		unit: "PCS",
		price: 20,
		cost: 30,
		quantity: 30,
		status: "ACTIVE",
	},
];

const tableHeaders = [
	{ id: "code", label: "Product Code" },
	{ id: "name", label: "Product Name" },
	{ id: "category", label: "Category" },
	{ id: "quantity", label: "Current quantity" },
	{ id: "unit", label: "Unit" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE", "INACTIVE"],
	},
];

const Inventory = () => {
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

	return (
		<Container>
			<PageTitle title="Inventory" />
			<FilterForm entity="inventory" onHandleFilters={handleFilter} />
			<ListingTable
				headers={tableHeaders}
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				availableMenu={optionMenu}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
			/>
		</Container>
	);
};

export default Inventory;
