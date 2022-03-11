import React, { useState, useEffect, useContext } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ListingTable from "../shared/UI/ListingTable";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import EmptyContainer from "../shared/UI/EmptyContainer";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		grid: {
			padding: theme.spacing(1),
		},
		card: {
			marginBottom: theme.spacing(1),
		},
		cardHeader: {
			padding: theme.spacing(2, 3),
		},
		cardContent: {
			marginTop: -25,
		},
		textField: {
			width: "100%",
			backgroundColor: "white",
		},
	};
});

const tableHeaders = [
	{ id: "prtNo", label: "Purchase Return Number", minWidth: 150 },
	{ id: "quantity", label: "Quantity Returned", minWidth: 100 },
	{ id: "price", label: "Total Price" },
	{ id: "createddate", label: "Purchase Return Date" },
];

const ViewPurchaseReturns = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const limit = 100;
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [viewData, setViewData] = useState(null);

	useEffect(() => {
		const loadPurchaseReturn = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/inventory/${auth.currentId}/purchase_returns?limit=${limit}&page=${page}`,
					"GET",
					null,
					{
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.token}`,
					}
				);

				setViewData({
					summary: data.summary,
					list: data.list,
				});
				setTotal(data.count);
			} catch (err) {}
		};

		loadPurchaseReturn();
	}, [page]);

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const totalPages = total ? Math.ceil(total / limit) : 0;

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Summary
						</Typography>
					}
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
				{!isLoading && !httpErrors && viewData && (
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={6}>
								<TextField
									value={viewData.summary.quantity}
									size="small"
									className={classes.textField}
									id="total-quantity"
									label="Total quantity returned"
									variant="outlined"
									readOnly
								/>
							</Grid>
							<Grid item className={classes.grid} xs={6}>
								<TextField
									value={viewData.summary.price}
									size="small"
									className={classes.textField}
									id="total-price"
									label="Total price returned"
									variant="outlined"
									readOnly
								/>
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Purchase returns with this product
						</Typography>
					}
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
				{!isLoading && !httpErrors && viewData && total === 0 && (
					<EmptyContainer message="No purchase returns found!" />
				)}
				{!isLoading && !httpErrors && viewData && total > 0 && (
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={12}>
								<ListingTable
									headers={tableHeaders}
									data={viewData.list}
									page={page}
									onHandlePage={handlePage}
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
							</Grid>
						</Grid>
					</CardContent>
				)}
			</Card>
		</div>
	);
};

export default ViewPurchaseReturns;
