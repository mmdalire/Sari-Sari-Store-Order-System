import React from "react";
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

const DUMMY_DATA = {
	_id: "620fbff03f030d924d878abc",
	poNo: "PONO202202-0001",
	customer: {
		customerNo: "CRM202202-0001",
		firstName: "SIMON",
		lastName: "OLIVER",
		middleInitial: "C",
	},
	products: [
		{
			code: "CGO-MSA",
			name: "MEGA SARDINES",
			quantity: 10,
			price: 21,
			cost: 17,
			_id: "620fbff03f030d924d878abd",
		},
		{
			code: "CGO-LSA",
			name: "LIGO SARDINES",
			quantity: 10,
			price: 21,
			cost: 17,
			_id: "620fbff03f030d924d878abe",
		},
	],
	credit: 0,
	status: "SUBMIT",
	remarks: "Some remarks",
	createdDate: "2022-02-18T15:49:04.781Z",
};

const DUMMY_RETURNS = [
	{
		_id: "CAN-CTU",
		name: "CENTURY TUNA",
		quantity: 9,
		price: 60,
		prtNo: ["PRTNO202202-0001", "PRTNO202202-0002"],
	},
];

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 150 },
	{ id: "name", label: "Brand Name", minWidth: 100 },
	{ id: "price", label: "Price", align: "right" },
	{ id: "quantity", label: "Order Quantity", align: "right" },
	{ id: "subtotal", label: "Subtotal", align: "right" },
];

const tableHeadersReturn = [
	{ id: "_id", label: "Product Code", minWidth: 150 },
	{ id: "name", label: "Brand Name", minWidth: 100 },
	{ id: "price", label: "Price", align: "right" },
	{ id: "quantity", label: "Return Quantity", align: "right" },
	{ id: "relatedPrtNo", label: "PRTs" },
];

const ViewOrder = () => {
	const classes = useStyles();

	const total = DUMMY_DATA.products.reduce(
		(total, product) => total + product.quantity * product.price,
		0
	);

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Order Information
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={5}>
							<TextField
								value={DUMMY_DATA.poNo}
								size="small"
								className={classes.textField}
								id="po-number"
								label="Order Number"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={3}>
							<TextField
								value={moment(DUMMY_DATA.createdDate).format(
									"MMMM D, YYYY "
								)}
								size="small"
								className={classes.textField}
								id="po-date"
								label="Order Date"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={2}>
							<TextField
								value={moment(DUMMY_DATA.createdDate).format(
									"hh:mm A"
								)}
								size="small"
								className={classes.textField}
								id="po-time"
								label="Order Time"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={2}>
							<TextField
								value={DUMMY_DATA.status}
								size="small"
								className={classes.textField}
								id="po-status"
								label="Order Status"
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
							Customer Information
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.customer.customerNo}
								size="small"
								className={classes.textField}
								id="customer-number"
								label="Customer Number"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={5}>
							<TextField
								value={DUMMY_DATA.customer.lastName}
								size="small"
								className={classes.textField}
								id="customer-last-name"
								label="Last Name"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={5}>
							<TextField
								value={DUMMY_DATA.customer.firstName}
								size="small"
								className={classes.textField}
								id="customer-first-name"
								label="First Name"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={2}>
							<TextField
								value={DUMMY_DATA.customer.middleInitial}
								size="small"
								className={classes.textField}
								id="customer-middle-initial"
								label="MI"
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
							Order details
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={12}>
							<ListingTable
								headers={tableHeaders}
								data={DUMMY_DATA.products}
								total={total}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.credit}
								size="small"
								className={classes.textField}
								id="credit"
								label="Credit"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.remarks}
								size="small"
								className={classes.textField}
								id="remarks"
								label="Remarks"
								variant="outlined"
								readOnly
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			{DUMMY_RETURNS && DUMMY_RETURNS.length > 0 && (
				<Card variant="outlined" className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title={
							<Typography variant="h6" color="primary">
								Product returns
							</Typography>
						}
					/>
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item className={classes.grid} xs={12}>
								<ListingTable
									headers={tableHeadersReturn}
									data={DUMMY_RETURNS}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default ViewOrder;
