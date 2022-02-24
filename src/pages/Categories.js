import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CreateCategory from "../components/categories/CreateCategory";
import DeleteCategory from "../components/categories/DeleteCategory";
import EditCategory from "../components/categories/EditCategory";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ViewCategory from "../components/categories/ViewCategory";

const DUMMY_ROWS = [
	{
		code: "BIS",
		name: "BISCUIT",
		status: "IN-USE",
	},
	{
		code: "CAN",
		name: "CANDY",
		status: "IN-USE",
	},
	{
		code: "CGO",
		name: "CANNED GOODS",
		status: "IN-USE",
	},
	{
		code: "CHI",
		name: "CHIPS",
		status: "UNUSED",
	},
	{
		code: "DET",
		name: "DETERGENT",
		status: "IN-USE",
	},
];

const tableHeaders = [
	{ id: "code", label: "Category code" },
	{ id: "name", label: "Name" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{
		id: "view",
		label: "View",
		activateIn: ["IN-USE", "UNUSED"],
		modalConfig: {
			top: 100,
			left: 400,
			width: 600,
			title: "View Category",
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
			top: 170,
			left: 450,
			width: 500,
			title: "Edit Category",
			icon: (
				<EditIcon
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
			title: "Delete Category",
			icon: (
				<DeleteIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createCategoryModal = {
	operation: "add",
	top: 170,
	left: 450,
	width: 500,
	title: "Add Category",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Categories = () => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createCategoryModal);

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

	const handleAddCategory = (newCategory) => {
		DUMMY_ROWS.push(newCategory);
		console.log(newCategory);
		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createCategoryModal);
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

	const categortBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateCategory onSave={handleAddCategory} />;
			case "view":
				return <ViewCategory />;
			case "edit":
				return <EditCategory />;
			case "delete":
				return <DeleteCategory />;
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
				{categortBody()}
			</ModalTemplate>
			{/* Listing */}
			<Container>
				<PageTitle title="Categories" />
				<FilterForm
					entity="categories"
					onHandleFilters={handleFilter}
				/>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Category
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

export default Categories;
