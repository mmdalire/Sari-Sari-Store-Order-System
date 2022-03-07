import React, { useState, useEffect, useContext } from "react";

import Pagination from "@material-ui/lab/Pagination";

import EmptyContainer from "../shared/UI/EmptyContainer";
import ListingTable from "../shared/UI/ListingTable";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const tableHeaders = [
	{ id: "code", label: "Code" },
	{ id: "name", label: "Name" },
];

const ViewCustomerCredit = () => {
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const limit = 10;

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const loadProducts = async () => {
		try {
			const data = await sendRequest(
				`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/categories/${auth.currentId}/products?page=${page}&limit=10`,
				"GET",
				null,
				{
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.token}`,
				}
			);

			setViewData(data);
		} catch (err) {}
	};

	useEffect(() => {
		loadProducts();
	}, [page]);

	const totalPages = total ? Math.ceil(total / limit) : 0;

	return (
		<>
			{isLoading && <Loading />}
			{!isLoading && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!isLoading &&
				!httpErrors &&
				viewData &&
				viewData.products.length === 0 && (
					<EmptyContainer
						message={
							httpErrors || "No products with this category yet!"
						}
					/>
				)}
			{!isLoading &&
				!httpErrors &&
				viewData &&
				viewData.products.length > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={viewData.products}
							page={page}
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
		</>
	);
};

export default ViewCustomerCredit;
