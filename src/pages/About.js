import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

import PageTitle from "../components/shared/UI/PageTitle";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			marginTop: theme.spacing(1),
		},
		grid: {
			padding: theme.spacing(1),
			width: "100%",
		},
		card: {
			marginBottom: theme.spacing(1),
		},
		cardHeader: {
			padding: theme.spacing(2, 3),
		},
		cardContent: {
			padding: theme.spacing(2, 3),
			marginTop: -25,
		},
	};
});

const versionHistory = [
	{
		id: "1.0.0",
		lastUpdated: "March 12, 2022",
		description: (
			<>
				<Typography style={{ paddingLeft: 20, marginTop: 20 }}>
					<b>What's New?</b>
				</Typography>
				<ul>
					<li key={1}>
						<Typography>
							Register and login to your account to manage your
							own sari-sari store
						</Typography>
					</li>
					<li key={2}>
						<Typography>
							Monitor your customers and making them sure that
							they have no credits to avoid being blacklisted
						</Typography>
					</li>
					<li key={3}>
						<Typography>
							Create orders and purchase returns
						</Typography>
					</li>
					<li key={4}>
						<Typography>Inventory management</Typography>
					</li>
					<li key={5}>
						<Typography>
							Analytics is viewed using the dashboard
						</Typography>
					</li>
				</ul>
			</>
		),
	},
];

const About = () => {
	const classes = useStyles();

	return (
		<Container>
			<PageTitle title="About" />

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							What is this app about?
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Typography>
						This project is aimed for sari-sari store owners who
						wants to keep track of the customers, orders, purchase
						returns, and inventory automatically.
					</Typography>

					<br />
					<Typography variant="h6" color="primary">
						Features Include:
					</Typography>
					<ul>
						<li>
							<Typography>
								Monitor your customers and making them sure that
								they have no credits to avoid being blacklisted
							</Typography>
						</li>
						<li>
							<Typography>
								Create orders and purchase returns
							</Typography>
						</li>
						<li>
							<Typography>Inventory management</Typography>
						</li>
						<li>
							<Typography>
								Analytics is viewed using the dashboard
							</Typography>
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card variant="outlined" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					title={
						<Typography variant="h6" color="primary">
							Version History
						</Typography>
					}
				/>
				<CardContent className={classes.cardContent}>
					<Grid container>
						{versionHistory.map((v) => (
							<Grid className={classes.grid} key={v.id} item>
								<Typography variant="h6">{v.id}</Typography>
								<Typography style={{ color: "gray" }}>
									{v.lastUpdated}
								</Typography>
								<div>{v.description}</div>
							</Grid>
						))}
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
};

export default About;
