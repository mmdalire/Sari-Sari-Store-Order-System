import React, { useState, useContext, useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import RestoreIcon from "@material-ui/icons/Restore";
import VisibilityIcon from "@material-ui/icons/Visibility";

import ChangePriceAndCost from "../components/products/ChangePriceAndCost";
import CreateProduct from "../components/products/CreateProduct";
import DeleteProduct from "../components/products/DeleteProduct";
import EditProduct from "../components/products/EditProduct";
import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import RestockProduct from "../components/products/RestockProduct";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";
import ViewProduct from "../components/products/ViewProduct";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "name", label: "Name" },
	{ value: "code", label: "Code" },
	{ value: "quantity", label: "Quantity" },
	{ value: "price", label: "Price" },
	{ value: "cost", label: "Cost" },
	{ value: "category", label: "Category" },
];

const tableHeaders = [
	{ id: "code", label: "Product code" },
	{ id: "name", label: "Name" },
	{ id: "category", label: "Category" },
	{ id: "unit", label: "Unit" },
	{ id: "price", label: "Price" },
	{ id: "cost", label: "Cost" },
	{ id: "quantity", label: "Quantity" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{
		id: "view",
		label: "View",
		activateIn: ["IN-USE", "UNUSED"],
		modalConfig: {
			top: 20,
			left: 310,
			width: 750,
			title: "View Product",
			icon: (
				<VisibilityIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "edit",
		label: "Edit",
		activateIn: ["UNUSED"],
		modalConfig: {
			top: 20,
			left: 310,
			width: 750,
			title: "Edit Product",
			icon: (
				<EditIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "restock",
		label: "Restock",
		activateIn: ["IN-USE"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Restock Quantity",
			icon: (
				<RestoreIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "changePriceCost",
		label: "Change Price & Cost",
		activateIn: ["IN-USE"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Change Price and Cost",
			icon: (
				<LocalOfferIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "delete",
		label: "Delete",
		activateIn: ["UNUSED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Delete product",
			icon: (
				<DeleteIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createProductModal = {
	operation: "add",
	top: 20,
	left: 310,
	width: 750,
	title: "Add Product",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Products = () => {
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [warnings, setWarnings] = useState(null);
	const [filter, setFilter] = useState({
		search: "",
		sort: "createddate",
		order: "desc",
		limit: 10,
		additional: {
			isBlacklisted: false,
		},
	});
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [list, setList] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createProductModal);

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleFilter = (filters) => {
		setFilter(filters);
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleCloseModal = (message = "") => {
		if (message) {
			setWarnings(message);

			loadProducts();
		}

		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createProductModal);
		setOpenModal(true);
	};

	const handleModalConfig = (passedModalConfig) => {
		if (passedModalConfig.operation) {
			setModalConfig(passedModalConfig);
			setOpenModal(true);
		} else {
			setOpenModal(false);
		}
	};

	const productBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateProduct onClose={handleCloseModal} />;
			case "view":
				return <ViewProduct />;
			case "edit":
				return <EditProduct onClose={handleCloseModal} />;
			case "restock":
				return <RestockProduct onClose={handleCloseModal} />;
			case "changePriceCost":
				return <ChangePriceAndCost onClose={handleCloseModal} />;
			case "delete":
				return <DeleteProduct onClose={handleCloseModal} />;
		}
	};

	const loadProducts = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}/api/products?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

		//If there is a search keyword
		if (filter.search) {
			url = `${url}&search=${filter.search}`;
		}

		try {
			clearError();

			const data = await sendRequest(url, "GET", null, {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			});

			setList(data.data);
			setTotal(data.count);
		} catch (err) {}
	};

	const totalPages = total ? Math.ceil(total / filter.limit) : 0;

	useEffect(() => {
		loadProducts();
	}, [filter, page]);

	return (
		<>
			{/* Snackbars */}
			{warnings && (
				<SnackbarTemplate
					open={!!warnings}
					type="success"
					message={warnings}
					onHandleClose={handleClearWarnings}
				/>
			)}

			{/* Modals */}
			<ModalTemplate
				open={openModal}
				onClose={handleCloseModal}
				top={modalConfig.top}
				left={modalConfig.left}
				width={modalConfig.width}
				modalTitle={modalConfig.title}
				modalIcon={modalConfig.icon}
			>
				{productBody()}
			</ModalTemplate>
			{/* Listing */}
			<Container>
				<PageTitle title="Products" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Product
				</Button>
				{isLoading && <Loading />}
				{!isLoading && httpErrors && (
					<EmptyContainer
						message={
							httpErrors ||
							"Something went wrong. Please try again later."
						}
					/>
				)}
				{!isLoading && !httpErrors && total === 0 && (
					<EmptyContainer message="No products found!" />
				)}
				{!isLoading && !httpErrors && total > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={list}
							page={page}
							availableMenu={optionMenus}
							onHandlePage={handlePage}
							onHandleModalConfig={handleModalConfig}
						/>
						<div
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "center",
								marginTop: 20,
							}}
						>
							<Pagination
								count={totalPages}
								color="primary"
								page={page}
								onChange={handlePage}
							/>
						</div>
					</>
				)}
			</Container>
		</>
	);
};

export default Products;
