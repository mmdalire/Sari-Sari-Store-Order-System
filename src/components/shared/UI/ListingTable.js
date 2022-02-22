import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { green, red } from "@material-ui/core/colors";

import AvatarTemplate from "./AvatarTemplate";
import OptionMenu from "./OptionMenu";

const headers = {
	customers: [
		{ id: "avatar", label: "Avatar" },
		{ id: "customerNo", label: "Customer Number" },
		{ id: "lastName", label: "Last Name", minWidth: 120 },
		{ id: "firstName", label: "First Name", minWidth: 150 },
		{ id: "middleInitial", label: "Middle Initial" },
		{ id: "status", label: "Status" },
		{ id: "actions", label: "", minWidth: 5 },
	],
	categories: [
		{ id: "code", label: "Category code" },
		{ id: "name", label: "Name" },
		{ id: "actions", label: "", minWidth: 5 },
	],
	products: [
		{ id: "code", label: "Product code" },
		{ id: "name", label: "Name" },
		{ id: "category", label: "Category" },
		{ id: "unit", label: "Unit" },
		{ id: "price", label: "Price" },
		{ id: "cost", label: "Cost" },
		{ id: "quantity", label: "Quantity" },
		{ id: "actions", label: "", minWidth: 5 },
	],
	orders: [
		{ id: "poNo", label: "Order Number" },
		{ id: "customer", label: "Customer Name" },
		{ id: "totalProducts", label: "Number of products" },
		{ id: "totalPrice", label: "Total Price" },
		{ id: "totalCost", label: "Total Cost" },
		{ id: "totalReturnedPrice", label: "Total Price Returned" },
		{ id: "orderDate", label: "Order Date" },
		{ id: "status", label: "Status" },
		{ id: "actions", label: "", minWidth: 5 },
	],
	purchaseReturns: [
		{ id: "prtNo", label: "Purchase Return Number" },
		{ id: "poNo", label: "Order Number" },
		{ id: "returnedTotalPrice", label: "Total Price Returned" },
		{ id: "returnedTotalQuantity", label: "Total Quantity Returned" },
		{ id: "returnDate", label: "Return Date" },
		{ id: "actions", label: "", minWidth: 5 },
	],
};

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: "100%",
			marginTop: theme.spacing(2),
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

	const [limit, setLimit] = useState(props.limit);
	const [page, setPage] = useState(props.page);

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
		}
	};

	const handlePageChange = (e) => {
		setPage(parseInt(e.target.value));
		props.onHandlePage(page);
	};

	const handleLimitChange = (e) => {
		setLimit(parseInt(e.target.value));
		props.onHandleLimit(limit);
	};

	const tableHeader = (
		<TableHead>
			<TableRow>
				{headers[props.entity].map((header) => {
					return (
						<TableCell
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
					<TableRow hover key={row.customerNo}>
						{headers[props.entity].map((header) => {
							let value;
							if (header.id === "avatar") {
								value = <AvatarTemplate data={row} />;
							} else if (header.id === "status") {
								value = chipStatus(row.status);
							} else if (header.id === "actions") {
								value = (
									<OptionMenu
										entity={props.entity}
										status={row.status}
									/>
								);
							} else {
								value = row[header.id];
							}

							return (
								<TableCell key={header.id} align="center">
									{value}
								</TableCell>
							);
						})}
					</TableRow>
				);
			})}
		</TableBody>
	);

	const tablePagination = (
		<TablePagination
			rowsPerPageOptions={[10, 25, 50, 75, 100]}
			component="div"
			count={100}
			rowsPerPage={limit}
			page={page}
			onPageChange={handlePageChange}
			onRowsPerPageChange={handleLimitChange}
		/>
	);

	return (
		<Paper className={classes.root}>
			<TableContainer>
				<Table stickyheader="true">
					{tableHeader}
					{tableBody}
				</Table>
			</TableContainer>
			{tablePagination}
		</Paper>
	);
};

export default ListingTable;
