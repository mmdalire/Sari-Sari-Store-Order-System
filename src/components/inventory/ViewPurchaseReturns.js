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
	quantity: 9,
	price: 270,
};

const DUMMY_ROWS = [
	{
		_id: "62106ff9deb2f1f7ce5131ab",
		prtNo: "PRTNO202202-0001",
		quantity: 5,
		price: 150,
		createdDate: "2022-02-19T04:20:09.032Z",
	},
	{
		_id: "621070792b7389a6ff5489d5",
		prtNo: "PRTNO202202-0002",
		quantity: 4,
		price: 120,
		createdDate: "2022-02-19T04:22:17.799Z",
	},
];

const tableHeaders = [
	{ id: "prtNo", label: "Purchase Return Number", minWidth: 150 },
	{ id: "quantity", label: "Quantity Returned", minWidth: 100 },
	{ id: "price", label: "Total Price" },
	{ id: "createdDate", label: "Order Date" },
];

const ViewPurchaseReturns = () => {
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
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={DUMMY_SUMMARY.quantity}
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
								value={DUMMY_SUMMARY.price}
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

export default ViewPurchaseReturns;
