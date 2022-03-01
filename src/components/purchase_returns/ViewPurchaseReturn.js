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
	_id: "621070792b7389a6ff5489d5",
	prtNo: "PRTNO202202-0002",
	poNo: "PONO202202-0001",
	order: "620fc097bb04325c094430bb",
	returnedProducts: [
		{
			code: "CAN-CTU",
			name: "CENTURY TUNA",
			quantity: 4,
			price: 30,
			_id: "621070792b7389a6ff5489d6",
		},
	],
	reason: "I don't want code",
	userId: "6205d6667325c8cef024bd72",
	createdDate: "2022-02-19T04:22:17.799Z",
};

const tableHeaders = [
	{ id: "code", label: "Product Code", minWidth: 100 },
	{ id: "name", label: "Brand Name", minWidth: 300 },
	{ id: "quantity", label: "Return Quantity" },
];

const ViewOrder = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
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
								value={DUMMY_DATA.prtNo}
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
								value={moment(DUMMY_DATA.createdDate).format(
									"MMMM D, YYYY "
								)}
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
								value={moment(DUMMY_DATA.createdDate).format(
									"hh:mm A"
								)}
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
							<TextField
								value={DUMMY_DATA.poNo}
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
								data={DUMMY_DATA.returnedProducts}
							/>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.reason}
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
			</Card>
		</div>
	);
};

export default ViewOrder;
