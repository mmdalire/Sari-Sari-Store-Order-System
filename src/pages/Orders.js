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
		poNo: "PONO202202-0001",
		customer: "TEST1 TESTL1",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0002",
		customer: "TEST2 TESTL2",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0003",
		customer: "TEST3 TESTL3",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0004",
		customer: "TEST4 TESTL4",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "CANCELLED",
	},
	{
		poNo: "PONO202202-0005",
		customer: "TEST5 TESTL5",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0006",
		customer: "TEST6 TESTL6",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 1,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
];

const tableHeaders = [
	{ id: "poNo", label: "Order Number", minWidth: 150 },
	{ id: "customer", label: "Customer Name", minWidth: 100 },
	{ id: "totalProducts", label: "Number of products" },
	{ id: "totalPrice", label: "Total Amount" },
	{ id: "credit", label: "Credit" },
	{ id: "totalReturnedPrice", label: "Total Price Returned" },
	{ id: "orderDate", label: "Order Date" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["DRAFT", "SUBMIT", "CANCELLED"],
	},
	{ id: "edit", label: "Edit", activateIn: ["DRAFT"] },
	{ id: "cancel", label: "Cancel", activateIn: ["DRAFT"] },
];

const Orders = () => {
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
			<PageTitle title="Orders" />
			<FilterForm entity="orders" onHandleFilters={handleFilter} />
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: "15px" }}
				startIcon={<AddIcon />}
			>
				Add Order
			</Button>
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

export default Orders;
