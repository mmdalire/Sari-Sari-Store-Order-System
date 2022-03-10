import React, { useState, useEffect, useContext } from "react";

import Pagination from "@material-ui/lab/Pagination";

import EmptyContainer from "../shared/UI/EmptyContainer";
import FilterForm from "../shared/form/FilterForm";
import ListingTable from "../shared/UI/ListingTable";
import Loading from "../shared/UI/Loading";
import SnackbarTemplate from "../shared/UI/SnackbarTemplate";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

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
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [warnings, setWarnings] = useState(null);
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

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleFilter = (filters) => {
		setFilter(filters);
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleSelectProduct = (selectProduct) => {
		setWarnings(`Successfully added ${selectProduct.code}`);

		props.onHandleSelect(selectProduct);
	};

	const loadProducts = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/products?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

		//If there is a search keyword
		if (filter.search) {
			url = `${url}&search=${filter.search}`;
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
		loadProducts();
	}, [filter, page]);

	return (
		<>
			{/* Snackbars */}
			{warnings && (
				<SnackbarTemplate
					open={!!warnings}
					type="success"
					message={warnings}
					duration={1000}
					onHandleClose={handleClearWarnings}
				/>
			)}

			<div style={{ marginTop: "10px" }}>
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
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
					<EmptyContainer message="No products found!" />
				)}
				{!isLoading && !httpErrors && total > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={list}
							page={page}
							onHandlePage={handlePage}
							onHandleSelect={handleSelectProduct}
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
		</>
	);
};

export default SelectProduct;
