import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import PageTitle from "../components/shared/UI/PageTitle";

const DUMMY_ROWS = [
	{
		customerNo: "CRM202202-0001",
		lastName: "TEST1",
		firstName: "TEST1L",
		middleInitial: "A",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0002",
		lastName: "TEST2",
		firstName: "TEST2L",
		middleInitial: "B",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0003",
		lastName: "TEST3",
		firstName: "TEST3L",
		middleInitial: "C",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0004",
		lastName: "TEST4",
		firstName: "TEST4L",
		middleInitial: "D",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0005",
		lastName: "TEST5",
		firstName: "TEST5L",
		middleInitial: "E",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0006",
		lastName: "TEST6",
		firstName: "TEST6L",
		middleInitial: "F",
		status: "BLACKLISTED",
		actions: [],
	},
	{
		customerNo: "CRM202202-0007",
		lastName: "TEST7",
		firstName: "TEST7L",
		middleInitial: "G",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0008",
		lastName: "TEST8",
		firstName: "TEST8L",
		middleInitial: "H",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0009",
		lastName: "TEST9",
		firstName: "TEST9L",
		middleInitial: "I",
		status: "ACTIVE",
		actions: [],
	},
	{
		customerNo: "CRM202202-0010",
		lastName: "TEST10",
		firstName: "TEST10L",
		middleInitial: "J",
		status: "BLACKLISTED",
		actions: [],
	},
];

const Customers = () => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);

	const handleFilter = (filters) => {
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
			<PageTitle title="Customers" />
			<FilterForm entity="customers" onHandleFilters={handleFilter} />
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: "15px" }}
				startIcon={<AddIcon />}
			>
				Add Customer
			</Button>
			<ListingTable
				entity="customers"
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
			/>
		</Container>
	);
};

export default Customers;
