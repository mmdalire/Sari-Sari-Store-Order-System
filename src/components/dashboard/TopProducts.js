import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import AvatarTemplate from "../shared/UI/AvatarTemplate";

const DUMMY_TOP_PRODUCTS = [
	{
		_id: "CAN-CTU",
		name: "CENTURY TUNA",
		totalQuantitySold: 2,
	},
];

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		cardTitle: {
			fontWeight: "bold",
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
			display: "flex",
		},
	};
});

const TopCustomers = () => {
	const classes = useStyles();

	return (
		<Grid item className={classes.grid} xs={6}>
			<Grid item className={classes.grid} xs={12}>
				<Typography
					variant="h5"
					style={{ fontWeight: "bold" }}
					color="primary"
				>
					Top Products
				</Typography>
			</Grid>
			<Grid item className={classes.grid} xs={12}>
				{DUMMY_TOP_PRODUCTS.map((product, index) => (
					<Card className={classes.card} key={product.name}>
						<CardContent className={classes.cardContent}>
							<Typography
								variant="h3"
								color="primary"
								style={{
									width: 50,
									marginRight: 20,
									textAlign: "center",
								}}
							>
								{String(index + 1).padStart(2, "0")}
							</Typography>
							<div style={{ width: "100%", marginLeft: 20 }}>
								<Typography
									variant="h5"
									style={{ fontWeight: "bold" }}
								>
									{product.name}
								</Typography>
								<Typography>
									{product.totalQuantitySold} quantity sold
								</Typography>
							</div>
						</CardContent>
					</Card>
				))}
			</Grid>
		</Grid>
	);
};

export default TopCustomers;
