import React, { useState, useEffect, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

import EmptyContainer from "../shared/UI/EmptyContainer";
import Loading from "../shared/UI/Loading";

import { AuthContext } from "../../context/auth-context";

import { useHttpClient } from "../../hooks/http-hook";

const useStyles = makeStyles((theme) => {
	return {
		textField: {
			width: "100%",
		},
		grid: {
			padding: theme.spacing(1),
		},
	};
});

const ViewCustomerInfo = () => {
	const classes = useStyles();

	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [viewData, setViewData] = useState(null);

	useEffect(() => {
		const loadCategoryInfo = async () => {
			try {
				const data = await sendRequest(
					`${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/categories/${auth.currentId}`,
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

		loadCategoryInfo();
	}, []);

	return (
		<Grid className={classes.root} container>
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
					<Grid item className={classes.grid} xs={6}>
						<TextField
							value={viewData.code}
							size="small"
							className={classes.textField}
							id="code"
							label="Code"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item className={classes.grid} xs={6}>
						<TextField
							value={viewData.name}
							size="small"
							className={classes.textField}
							id="name"
							label="Category Name"
							variant="outlined"
							InputProps={{
								readOnly: true,
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</>
			)}
		</Grid>
	);
};

export default ViewCustomerInfo;
