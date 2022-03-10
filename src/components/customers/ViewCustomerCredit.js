import React, { useState, useEffect, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import EmptyContainer from "../shared/UI/EmptyContainer";
import ListingTable from "../shared/UI/ListingTable";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const tableHeaders = [
	{ id: "poNo", label: "Order Number" },
	{ id: "credit", label: "Credit" },
	{ id: "createddate", label: "Order Date" },
];

const useStyles = makeStyles((theme) => {
	return {
		textField: {
			width: "100%",
		},
		grid: {
			padding: theme.spacing(1),
		},
	};
});

const ViewCustomerCredit = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const limit = 10;
	const [readingIsLoading, setReadingIsLoading] = useState(false);
	const [viewDataCredits, setViewDataCredits] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	useEffect(() => {
		const loadCustomerCredits = async () => {
			setReadingIsLoading(true);
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/customers/${auth.currentId}/credits`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setViewDataCredits(data);
				setTotal(data.count);
			} catch (err) {}
			setReadingIsLoading(false);
		};

		loadCustomerCredits();
	}, []);

	const totalPages = total ? Math.ceil(total / limit) : 0;

	return (
		<div>
			{readingIsLoading && <Loading />}
			{!readingIsLoading && httpErrors && (
				<EmptyContainer
					message={
						httpErrors ||
						"Something went wrong. Please try again later."
					}
				/>
			)}
			{!readingIsLoading && !httpErrors && viewDataCredits && (
				<>
					<Grid container>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={viewDataCredits.totalCredits.toLocaleString(
									undefined,
									{ minimumFractionDigits: 2 }
								)}
								size="small"
								className={classes.textField}
								id="total-credit"
								label="Total Credit"
								variant="outlined"
								InputProps={{
									readOnly: true,
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
					</Grid>
					{viewDataCredits.orders.length > 0 && (
						<>
							<ListingTable
								headers={tableHeaders}
								data={viewDataCredits.orders}
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
					{viewDataCredits.orders.length === 0 && (
						<EmptyContainer message="There are no credits for this customer." />
					)}
				</>
			)}
		</div>
	);
};

export default ViewCustomerCredit;
