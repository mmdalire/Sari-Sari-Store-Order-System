import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CreateProduct from "../components/products/CreateProduct";
import DeleteProduct from "../components/products/DeleteProduct";
import EditProduct from "../components/products/EditProduct";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import RestockProduct from "../components/products/RestockProduct";
import ViewProduct from "../components/products/ViewProduct";

const DUMMY_ROWS = [
	{
		code: "PRD1",
		name: "PRODUCT 1",
		category: "CATEGORY 1",
		unit: "PCS",
		price: 10,
		cost: 20,
		quantity: 20,
		status: "IN-USE",
	},
	{
		code: "PRD2",
		name: "PRODUCT 2",
		category: "CATEGORY 2",
		unit: "PCS",
		price: 15,
		cost: 25,
		quantity: 25,
		status: "IN-USE",
	},
	{
		code: "PRD3",
		name: "PRODUCT 3",
		category: "CATEGORY 3",
		unit: "PCS",
		price: 20,
		cost: 30,
		quantity: 30,
		status: "UNUSED",
	},
];

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
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createProductModal);

	const handleFilter = (filters) => {
		console.log(filters);
		setFilter(filters);
	};

	const handleLimit = (limit) => {
		setLimit(limit);
		setPage(1);
	};

	const handlePage = (page) => {
		setPage(page);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleAddProduct = (newProduct) => {
		DUMMY_ROWS.push(newProduct);
		console.log(newProduct);
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
				return <CreateProduct onSave={handleAddProduct} />;
			case "view":
				return <ViewProduct />;
			case "edit":
				return <EditProduct />;
			case "restock":
				return <RestockProduct />;
			case "delete":
				return <DeleteProduct onCancel={handleCloseModal} />;
		}
	};

	return (
		<>
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
				<ListingTable
					headers={tableHeaders}
					data={DUMMY_ROWS}
					limit={limit}
					page={page}
					availableMenu={optionMenus}
					onHandleLimit={handleLimit}
					onHandlePage={handlePage}
					onHandleModalConfig={handleModalConfig}
				/>
			</Container>
		</>
	);
};

export default Products;
