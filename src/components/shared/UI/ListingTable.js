import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
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
					<TableRow hover key={row.customerNo}>
						{props.headers.map((header) => {
							let value;
							if (header.id === "avatar") {
								value = <AvatarTemplate data={row} />;
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
									/>
								);
							} else if (header.id === "credit") {
								value = creditStatus(row.credit);
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
			className={classes.tableHeaderFooter}
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
