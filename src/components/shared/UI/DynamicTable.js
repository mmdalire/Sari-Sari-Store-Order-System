import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { blue, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

import DynamicTableTextField from "./DynamicTableTextField";

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
		textField: {
			width: "100%",
		},
		danger: {
			color: red[900],
			fontWeight: "bold",
		},
	};
});

const DynamicTable = (props) => {
	const classes = useStyles();

	const handleDelete = (id) => {
		props.onDelete(id);
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
			{props.data.map((row, index) => {
				return (
					<TableRow hover key={index}>
						{props.headers.map((header) => {
							let value;

							//Any delete operations in the table
							if (header.id === "deleteAction") {
								value = (
									<IconButton
										className={classes.danger}
										size="small"
										onClick={() => handleDelete(row.code)}
									>
										<RemoveCircleIcon />
									</IconButton>
								);
							}
							//Allowing input for ordered quantity
							else if (header.id === "orderQuantity") {
								value = (
									<DynamicTableTextField
										type="number"
										reference={row.code}
										value={row.quantity}
										originalValue={row.orderQuantity}
										fieldErrors={props.fieldErrors}
										onNumberChange={props.onNumberChange}
										required
										edit={!!props.edit}
									/>
								);
							}
							//Input for subtotals
							else if (header.id === "subtotal") {
								value = (
									<Typography style={{ textAlign: "right" }}>
										{row.subtotal ||
											row.orderQuantity * row.price}
									</Typography>
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

	const tableFooter = (
		<TableFooter>
			<TableRow>
				<TableCell
					colSpan={props.headers.length - 2}
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
				<TableCell colSpan={1}>
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

export default DynamicTable;
