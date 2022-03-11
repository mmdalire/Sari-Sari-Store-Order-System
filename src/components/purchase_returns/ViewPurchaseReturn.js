import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ListingTable from "../shared/UI/ListingTable";
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
	{ id: "code", label: "Product Code", minWidth: 100 },
	{ id: "name", label: "Brand Name", minWidth: 300 },
	{ id: "quantity", label: "Return Quantity" },
];

const ViewOrder = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);

	useEffect(() => {
		const loadPurchaseReturnInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/purchase_return/${auth.currentId}`,
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

		loadPurchaseReturnInfo();
	}, []);

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
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
					<>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography variant="h6" color="primary">
									Purchase Return Information
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								<Grid item className={classes.grid} xs={6}>
									<TextField
										value={viewData.prtNo}
										size="small"
										className={classes.textField}
										id="prt-number"
										label="Purchase Return Number"
										variant="outlined"
										readOnly
									/>
								</Grid>
								<Grid item className={classes.grid} xs={3}>
									<TextField
										value={moment(
											viewData.createdDate
										).format("MMMM D, YYYY ")}
										size="small"
										className={classes.textField}
										id="prt-date"
										label="Purchase Return Date"
										variant="outlined"
										readOnly
									/>
								</Grid>
								<Grid item className={classes.grid} xs={3}>
									<TextField
										value={moment(
											viewData.createdDate
										).format("hh:mm A")}
										size="small"
										className={classes.textField}
										id="prt-time"
										label="Purchase Return Time"
										variant="outlined"
										readOnly
									/>
								</Grid>
							</Grid>
						</CardContent>
					</>
				)}
			</Card>
			<Card variant="outlined" className={classes.card}>
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
					<>
						<CardHeader
							className={classes.cardHeader}
							title={
								<Typography variant="h6" color="primary">
									Order details
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								<Grid item className={classes.grid} xs={12}>
									<TextField
										value={viewData.orderNo}
										size="small"
										className={classes.textField}
										id="pono"
										label="Order Number"
										variant="outlined"
										readOnly
									/>
								</Grid>
								<Grid item className={classes.grid} xs={12}>
									<ListingTable
										headers={tableHeaders}
										data={viewData.returnedProducts}
									/>
								</Grid>
								<Grid item className={classes.grid} xs={12}>
									<TextField
										value={viewData.reason}
										size="small"
										className={classes.textField}
										id="prt-reason"
										label="Reason"
										variant="outlined"
										readOnly
									/>
								</Grid>
							</Grid>
						</CardContent>
					</>
				)}
			</Card>
		</div>
	);
};

export default ViewOrder;
