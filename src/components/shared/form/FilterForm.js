import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
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
			width: "200px",
		},
		search: {
			marginRight: "20px",
			width: "20%",
		},
	};
});

const sortFields = {
	customers: [
		{ value: "createddate", label: "Created Date" },
		{ value: "updateddate", label: "Last Updated" },
		{ value: "customerno", label: "Customer Number" },
		{ value: "lastname", label: "Lastname" },
		{ value: "firstname", label: "Firstname" },
		{ value: "isblacklisted", label: "Status" },
	],
	categories: [
		{ value: "createddate", label: "Created Date" },
		{ value: "updateddate", label: "Last Updated" },
		{ value: "name", label: "Name" },
		{ value: "code", label: "Code" },
	],
	products: [
		{ value: "createddate", label: "Created Date" },
		{ value: "updateddate", label: "Last Updated" },
		{ value: "name", label: "Name" },
		{ value: "code", label: "Code" },
		{ value: "quantity", label: "Quantity" },
		{ value: "price", label: "Price" },
		{ value: "cost", label: "Cost" },
		{ value: "category", label: "Category" },
	],
	orders: [
		{ value: "createddate", label: "Created Date" },
		{ value: "updateddate", label: "Last Updated" },
		{ value: "pono", label: "Order Number" },
		{ value: "status", label: "Status" },
		{ value: "customer", label: "Customer" },
		{ value: "totalprice", label: "Total Amount" },
		{ value: "totalproducts", label: "Products Bought" },
	],
	purchaseReturns: [
		{ value: "createddate", label: "Created Date" },
		{ value: "updateddate", label: "Last Updated" },
		{ value: "prtno", label: "Purchase Return Number" },
		{ value: "pono", label: "Order Number" },
		{ value: "returnedtotalprice", label: "Total Price Returned" },
		{ value: "returnedtotalquantity", label: "Total Quantity Returned" },
	],
};

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
		aditional: {
			isBlackListed: false,
		},
	});

	const handleIsBlackListedChange = (e) => {
		const newState = {
			...filterParams,
		};
		newState.customers.isBlackListed = e.target.checked;

		setFilterParams(newState);
	};

	const handleSortChange = (e) => {
		setFilterParams({ ...filterParams, sort: e.target.value });
	};

	const handleOrderChange = (e) => {
		setFilterParams({ ...filterParams, order: e.target.value });
	};

	const handleSearchChange = (e) => {
		setFilterParams({ ...filterParams, search: e.target.value });
	};

	const handleSearchBtn = (e) => {
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
			{sortFields[props.entity].map((option) => {
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

	let additionalCustomerFilter;
	//Set the appropriate filter options per entity
	if (props.entity === "customers") {
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
		<form className={classes.form} noValidate autoComplete="off">
			{sortFilter}
			{orderFilter}
			{additionalCustomerFilter}
			{searchFilter}
			<Button
				onClick={handleSearchBtn}
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
