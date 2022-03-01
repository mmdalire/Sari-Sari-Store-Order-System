import React, { useState } from "react";
import moment from "moment";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ListingTable from "../shared/UI/ListingTable";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

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

const DUMMY_SUMMARY = {
	quantity: 15,
	price: 450,
	cost: 600,
};

const DUMMY_ROWS = [
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
	{
		_id: "620fc097bb04325c094430bb",
		poNo: "PONO202202-0002",
		quantity: 15,
		price: 450,
		cost: 600,
		createdDate: "2022-02-18T15:51:51.666Z",
		updatedDate: null,
	},
];

const tableHeaders = [
	{ id: "poNo", label: "Order Number", minWidth: 150 },
	{ id: "quantity", label: "Quantity", minWidth: 100 },
	{ id: "price", label: "Total Price" },
	{ id: "cost", label: "Total Cost" },
	{ id: "createdDate", label: "Order Date" },
	{ id: "updatedDate", label: "Last Updated" },
];

const ViewOrders = () => {
	const classes = useStyles();

	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);

	const handleLimit = (limit) => {
		setLimit(limit);
		setPage(1);
	};

	const handlePage = (page) => {
		setPage(page);
	};

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
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_SUMMARY.quantity}
								size="small"
								className={classes.textField}
								id="total-quantity"
								label="Total quantity bought"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_SUMMARY.price}
								size="small"
								className={classes.textField}
								id="total-price"
								label="Total price earned"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_SUMMARY.cost}
								size="small"
								className={classes.textField}
								id="total-cost"
								label="Total cost spend"
								variant="outlined"
								readOnly
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Orders with this product
						</Typography>
					}
				/>

				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={12}>
							<ListingTable
								headers={tableHeaders}
								data={DUMMY_ROWS}
								limit={limit}
								page={page}
								onHandleLimit={handleLimit}
								onHandlePage={handlePage}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
};

export default ViewOrders;
