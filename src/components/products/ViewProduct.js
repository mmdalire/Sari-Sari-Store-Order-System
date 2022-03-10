import React, { useState, useEffect, useContext } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
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

const ViewCategory = (props) => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);

	useEffect(() => {
		const loadProductInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/products/${auth.currentId}`,
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

		loadProductInfo();
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
									Primary Information
								</Typography>
							}
						/>
						<CardContent className={classes.cardContent}>
							<Grid container>
								<Grid item className={classes.grid} xs={6}>
									<TextField
										value={viewData.name}
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
										value={viewData.category}
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
										value={viewData.code}
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
										value={
											viewData.description ||
											"No description"
										}
										size="small"
										className={classes.textField}
										id="description"
										label="Description"
										variant="outlined"
										readOnly
										disabled={!viewData.description}
									/>
								</Grid>
								<Grid item className={classes.grid} xs={4}>
									<TextField
										value={viewData.type.toUpperCase()}
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
										value={viewData.unit.toUpperCase()}
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
										value={viewData.quantity}
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
										value={viewData.price}
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
										value={viewData.cost}
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
					</>
				)}
			</Card>
		</div>
	);
};

export default ViewCategory;
