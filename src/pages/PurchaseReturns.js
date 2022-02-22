import React, { useState } from "react";
import moment from "moment";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import PageTitle from "../components/shared/UI/PageTitle";

const DUMMY_ROWS = [
	{
		prtNo: "PRTNO202202-0001",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 1,
		returnedTotalQuantity: 10,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
	{
		prtNo: "PRTNO202202-0002",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 100,
		returnedTotalQuantity: 2,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
	{
		prtNo: "PRTNO202202-0001",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 1,
		returnedTotalQuantity: 10,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
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
			<PageTitle title="Purchase Returns" />
			<FilterForm
				entity="purchaseReturns"
				onHandleFilters={handleFilter}
			/>
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: "15px" }}
				startIcon={<AddIcon />}
			>
				Add Purchase Return
			</Button>
			<ListingTable
				entity="purchaseReturns"
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
			/>
		</Container>
	);
};

export default Products;
