import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
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
	},
	{
		code: "PRD2",
		name: "PRODUCT 2",
		category: "CATEGORY 2",
		unit: "PCS",
		price: 15,
		cost: 25,
		quantity: 25,
	},
	{
		code: "PRD3",
		name: "PRODUCT 3",
		category: "CATEGORY 3",
		unit: "PCS",
		price: 20,
		cost: 30,
		quantity: 30,
	},
];

const tableHeaders = [
	{ id: "code", label: "Product code" },
	{ id: "name", label: "Name" },
	{ id: "category", label: "Category" },
	{ id: "unit", label: "Unit" },
	{ id: "price", label: "Price" },
	{ id: "cost", label: "Cost" },
	{ id: "quantity", label: "Quantity" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{ id: "view", label: "View", activateIn: ["ACTIVE"] },
	{ id: "edit", label: "Edit", activateIn: ["ACTIVE"] },
	{ id: "delete", label: "Delete", activateIn: ["ACTIVE"] },
];

const Products = () => {
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
			<PageTitle title="Products" />
			<FilterForm entity="products" onHandleFilters={handleFilter} />
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: "15px" }}
				startIcon={<AddIcon />}
			>
				Add Product
			</Button>
			<ListingTable
				headers={tableHeaders}
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				availableMenu={optionMenus}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
			/>
		</Container>
	);
};

export default Products;
