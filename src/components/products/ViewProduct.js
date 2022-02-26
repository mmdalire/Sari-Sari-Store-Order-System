import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const DUMMY_DATA = {
	code: "PRD1",
	name: "PRODUCT 1",
	category: "CATEGORY 1",
	description: "Some description",
	type: "COUNTABLE",
	unit: "PCS",
	price: 10,
	cost: 20,
	quantity: 20,
	status: "IN-USE",
};

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

const ViewCategory = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Primary Information
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={DUMMY_DATA.name}
								size="small"
								className={classes.textField}
								id="name"
								label="Name"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={6}>
							<TextField
								value={DUMMY_DATA.category}
								size="small"
								className={classes.textField}
								id="category"
								label="Category"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.code}
								size="small"
								className={classes.textField}
								id="code"
								label="Product Code"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={12}>
							<TextField
								value={DUMMY_DATA.description}
								size="small"
								className={classes.textField}
								id="description"
								label="Description"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_DATA.type}
								size="small"
								className={classes.textField}
								id="type"
								label="Type"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={8}>
							<TextField
								value={DUMMY_DATA.unit}
								size="small"
								className={classes.textField}
								id="unit"
								label="Unit"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_DATA.quantity}
								size="small"
								className={classes.textField}
								id="quantity"
								label="Stock quantity"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_DATA.price}
								size="small"
								className={classes.textField}
								id="price"
								label="Price"
								variant="outlined"
								readOnly
							/>
						</Grid>
						<Grid item className={classes.grid} xs={4}>
							<TextField
								value={DUMMY_DATA.cost}
								size="small"
								className={classes.textField}
								id="cost"
								label="Cost"
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

export default ViewCategory;
