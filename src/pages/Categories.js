import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import PageTitle from "../components/shared/UI/PageTitle";

const DUMMY_ROWS = [
	{
		code: "BIS",
		name: "BISCUIT",
	},
	{
		code: "CAN",
		name: "CANDY",
	},
	{
		code: "CGO",
		name: "CANNED GOODS",
	},
	{
		code: "CHI",
		name: "CHIPS",
	},
	{
		code: "DET",
		name: "DETERGENT",
	},
];

const Categories = () => {
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
			<PageTitle title="Categories" />
			<FilterForm entity="categories" onHandleFilters={handleFilter} />
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: "15px" }}
				startIcon={<AddIcon />}
			>
				Add Category
			</Button>
			<ListingTable
				entity="categories"
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
			/>
		</Container>
	);
};

export default Categories;
