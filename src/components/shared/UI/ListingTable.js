import React from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { blue, green, red } from "@material-ui/core/colors";

import AvatarTemplate from "./AvatarTemplate";
import OptionMenu from "./OptionMenu";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: "100%",
			marginTop: theme.spacing(2),
		},
		tableHeaderFooter: {
			backgroundColor: blue[500],
			color: "white",
			fontWeight: "bold",
		},
		normal: {
			fontWeight: "bold",
		},
		success: {
			backgroundColor: green[100],
			color: green[900],
			fontWeight: "bold",
		},
		danger: {
			backgroundColor: red[100],
			color: red[900],
			fontWeight: "bold",
		},
	};
});

const ListingTable = (props) => {
	const classes = useStyles();

	const chipStatus = (status) => {
		switch (status) {
			case "ACTIVE":
				return <Chip label="ACTIVE" className={classes.success} />;
			case "BLACKLISTED":
				return <Chip label="BLACKLISTED" className={classes.danger} />;
			case "SUBMIT":
				return <Chip label="SUBMITTED" className={classes.success} />;
			case "DRAFT":
				return <Chip label="DRAFTED" className={classes.normal} />;
			case "CANCELLED":
				return <Chip label="CANCELLED" className={classes.danger} />;
			case "INACTIVE":
				return <Chip label="INACTIVE" className={classes.danger} />;
			case "IN-USE":
				return <Chip label="IN-USE" className={classes.danger} />;
			case "UNUSED":
				return <Chip label="UNUSED" className={classes.success} />;
		}
	};

	const creditStatus = (credit) => {
		if (parseInt(credit) > 0) {
			return <Chip label={credit} className={classes.danger} />;
		}
		return credit;
	};

	const prt = (prtNo) => {
		return prtNo.map((prt) => {
			return <Chip key={prt} label={prt} style={{ marginBottom: 10 }} />;
		});
	};

	const handleSelectCustomer = (data) => {
		props.onHandleSelect(data);
	};

	const handleSelectProduct = (data) => {
		const productData = {
			name: data.name,
			category: data.category,
			code: data.code,
			price: data.price,
			cost: data.cost,
			quantity: data.quantity,
			orderQuantity: 0,
			subtotal: "-",
		};

		props.onHandleSelect(productData);
	};

	const tableHeader = (
		<TableHead>
			<TableRow>
				{props.headers.map((header) => {
					return (
						<TableCell
							className={classes.tableHeaderFooter}
							key={header.id}
							align="center"
							style={
								header.minWidth
									? { minWidth: header.minWidth }
									: {}
							}
						>
							{header.label}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);

	const tableBody = (
		<TableBody>
			{props.data.map((row) => {
				return (
					<TableRow hover key={row._id || row.code}>
						{props.headers.map((header) => {
							let value;

							if (header.id === "avatar") {
								value = <AvatarTemplate data={row} />;
							} else if (
								header.id === "customer" &&
								typeof row === "object"
							) {
								value = `${row.customer.firstName} ${row.customer.lastName}`;
							} else if (header.id === "status") {
								value = chipStatus(row.status);
							} else if (header.id === "actions") {
								value = (
									<OptionMenu
										onHandleModalConfig={
											props.onHandleModalConfig
										}
										availableMenu={props.availableMenu}
										status={row.status}
										referenceId={row._id}
									/>
								);
							}
							//This column is for selection of customers (in CREATING orders)
							else if (header.id === "selectCustomer") {
								value = (
									<Button
										variant="contained"
										color="primary"
										onClick={() =>
											handleSelectCustomer(row)
										}
									>
										<AddIcon />
									</Button>
								);
							}
							//This column is for selection of products (in CREATING orders)
							else if (header.id === "selectProduct") {
								value = (
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleSelectProduct(row)}
									>
										<AddIcon />
									</Button>
								);
							}
							//This column is for computing of subtotal per product (in VIEWING orders)
							else if (header.id === "subtotal") {
								value = row.price * row.orderQuantity;
							} else if (header.id === "credit") {
								value = creditStatus(row.credit);
							}
							//This column is for the PRTs existed related in a product (in VIEWING orders)
							else if (header.id === "relatedPrtNo") {
								value = prt(row.prtNo);
							} else if (
								header.id === "orderDate" ||
								header.id === "createddate" ||
								header.id === "returnDate" ||
								header.id === "updateddate"
							) {
								value = moment(row.createddate).format(
									"MMMM D, YYYY hh:mm A"
								);
							} else {
								value = row[header.id];
							}

							return (
								<TableCell
									key={header.id}
									align={header.align || "center"}
								>
									{value}
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</TableBody>
	);

	let tableFooter;
	if (props.total) {
		tableFooter = (
			<TableFooter>
				<TableRow>
					<TableCell
						colSpan={props.headers.length - 1}
						style={{
							textAlign: "right",
						}}
					>
						<Typography
							style={{ fontWeight: "bold", color: "black" }}
							gutterBottom
						>
							TOTAL AMOUNT :
						</Typography>
					</TableCell>
					<TableCell>
						<Typography
							style={{
								textAlign: "right",
								color: "black",
								fontWeight: "bold",
							}}
						>
							{props.total}
						</Typography>
					</TableCell>
				</TableRow>
			</TableFooter>
		);
	}

	return (
		<Paper className={classes.root}>
			<TableContainer>
				<Table stickyheader="true">
					{tableHeader}
					{tableBody}
					{tableFooter}
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default ListingTable;
