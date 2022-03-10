import React, { useState, useEffect, useContext } from "react";

import Pagination from "@material-ui/lab/Pagination";

import EmptyContainer from "../shared/UI/EmptyContainer";
import FilterForm from "../shared/form/FilterForm";
import ListingTable from "../shared/UI/ListingTable";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

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
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [filter, setFilter] = useState({
		search: "",
		sort: "createddate",
		order: "desc",
		limit: 10,
		additional: {
			isBlacklisted: false,
		},
	});
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [list, setList] = useState(null);

	const handleFilter = (filters) => {
		setFilter(filters);
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleSelectCustomer = (selectCustomer) => {
		props.onHandleSelect(selectCustomer);
	};

	const loadCustomers = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/customers?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

		//If there is a search keyword
		if (filter.search) {
			url = `${url}&search=${filter.search}`;
		}

		//If the filter specifies to only get the blacklisted ones
		if (filter.additional.isBlacklisted) {
			url = `${url}&isBlacklisted`;
		}

		try {
			clearError();

			const data = await sendRequest(url, "GET", null, {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			});

			setList(data.data);
			setTotal(data.count);
		} catch (err) {}
	};

	const totalPages = total ? Math.ceil(total / filter.limit) : 0;

	useEffect(() => {
		loadCustomers();
	}, [filter, page]);

	return (
		<div style={{ marginTop: "10px" }}>
			<FilterForm
				sort={sortFields}
				isBlacklisted
				onHandleFilters={handleFilter}
			/>
			{isLoading && <Loading />}
			{!isLoading && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!isLoading && !httpErrors && total === 0 && (
				<EmptyContainer message="No customers found!" />
			)}
			{!isLoading && !httpErrors && total > 0 && (
				<>
					<ListingTable
						headers={tableHeaders}
						data={list}
						page={page}
						onHandlePage={handlePage}
						onHandleSelect={handleSelectCustomer}
					/>
					<div
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<Pagination
							count={totalPages}
							color="primary"
							page={page}
							onChange={handlePage}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SelectCustomer;
