import React, { useState } from "react";

import FilterForm from "../shared/form/FilterForm";
import ListingTable from "../shared/UI/ListingTable";

const DUMMY_ROWS = [
	{
		_id: "dfdjshskdskjdasd",
		customerNo: "CRM202202-0001",
		lastName: "TEST1",
		firstName: "TEST1L",
		middleInitial: "A",
		status: "ACTIVE",
	},
	{
		_id: "3hdnch6",
		customerNo: "CRM202202-0002",
		lastName: "TEST2",
		firstName: "TEST2L",
		middleInitial: "B",
		status: "ACTIVE",
	},
];

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "customerno", label: "Customer Number" },
	{ value: "lastname", label: "Lastname" },
	{ value: "firstname", label: "Firstname" },
	{ value: "isblacklisted", label: "Status" },
];

const tableHeaders = [
	{ id: "avatar", label: "Avatar" },
	{ id: "customerNo", label: "Customer Number" },
	{ id: "lastName", label: "Last Name", minWidth: 120 },
	{ id: "firstName", label: "First Name", minWidth: 150 },
	{ id: "middleInitial", label: "Middle Initial" },
	{ id: "status", label: "Status" },
	{ id: "selectCustomer", label: "" },
];

const SelectCustomer = (props) => {
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

	const handleSelectCustomer = (selectCustomer) => {
		props.onHandleSelect(selectCustomer);
	};

	return (
		<div style={{ marginTop: "10px" }}>
			<FilterForm
				sort={sortFields}
				isBlacklisted
				onHandleFilters={handleFilter}
			/>
			<ListingTable
				headers={tableHeaders}
				data={DUMMY_ROWS}
				limit={limit}
				page={page}
				onHandleLimit={handleLimit}
				onHandlePage={handlePage}
				onHandleSelect={handleSelectCustomer}
			/>
		</div>
	);
};

export default SelectCustomer;
