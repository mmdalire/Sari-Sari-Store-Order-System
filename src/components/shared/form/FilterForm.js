import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
	return {
		form: {
			display: "flex",
			alignContent: "center",
			justifyContent: "flex-end",
		},
		filter: {
			marginRight: theme.spacing(4),
			width: "150px",
		},
		limit: {
			marginRight: "30px",
			width: "10%",
		},
		search: {
			marginRight: "20px",
			width: "20%",
		},
	};
});

const orderField = [
	{ value: "asc", label: "Ascending" },
	{ value: "desc", label: "Descending" },
];

const FilterForm = (props) => {
	const classes = useStyles();
	const [filterParams, setFilterParams] = useState({
		search: "",
		sort: "createddate",
		order: "desc",
		limit: 10,
		additional: {
			isBlacklisted: false,
		},
	});

	const handleIsBlackListedChange = (e) => {
		const newState = {
			...filterParams,
		};
		newState.additional.isBlacklisted = e.target.checked;

		setFilterParams(newState);
	};

	const handleSortChange = (e) => {
		setFilterParams({ ...filterParams, sort: e.target.value });
	};

	const handleOrderChange = (e) => {
		setFilterParams({ ...filterParams, order: e.target.value });
	};

	const handleLimitChange = (e) => {
		setFilterParams({ ...filterParams, limit: parseInt(e.target.value) });
	};

	const handleSearchChange = (e) => {
		setFilterParams({ ...filterParams, search: e.target.value });
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		props.onHandleFilters(filterParams);
	};

	//Set the sorting and ordering filters per entity
	const sortFilter = (
		<TextField
			className={classes.filter}
			select
			label="Sort"
			value={filterParams.sort}
			onChange={handleSortChange}
		>
			{props.sort.map((option) => {
				return (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				);
			})}
		</TextField>
	);

	const orderFilter = (
		<TextField
			className={classes.filter}
			select
			label="Order"
			value={filterParams.order}
			onChange={handleOrderChange}
		>
			{orderField.map((option) => {
				return (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				);
			})}
		</TextField>
	);

	const limitFilter = (
		<TextField
			className={classes.limit}
			onChange={handleLimitChange}
			value={filterParams.limit}
			inputProps={{ min: 1 }}
			id="limit"
			label="Limit"
			type="number"
		/>
	);

	let additionalCustomerFilter;
	//Set the appropriate filter options per entity
	if (props.isBlacklisted) {
		//Is blacklisted filter
		additionalCustomerFilter = (
			<FormControlLabel
				style={{
					border: "1px solid gray",
					borderRadius: "3px",
					paddingRight: "10px",
					textAlign: "center",
				}}
				control={
					<Checkbox
						onChange={handleIsBlackListedChange}
						name="isBlacklisted"
						color="primary"
					/>
				}
				label="Is blacklisted?"
			/>
		);
	}

	//Set search filter
	const searchFilter = (
		<TextField
			className={classes.search}
			onChange={handleSearchChange}
			value={filterParams.search}
			id="search"
			label="Search here"
			type="search"
		/>
	);

	return (
		<form
			className={classes.form}
			onSubmit={handleSearchSubmit}
			noValidate
			autoComplete="off"
		>
			{sortFilter}
			{orderFilter}
			{limitFilter}
			{additionalCustomerFilter}
			{searchFilter}
			<Button
				size="small"
				variant="contained"
				type="submit"
				color="primary"
				startIcon={<SearchIcon />}
			>
				{" "}
				Search{" "}
			</Button>
		</form>
	);
};

export default FilterForm;
