import React, { useState } from "react";

import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Container from "@material-ui/core/Container";

import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ViewProduct from "../components/inventory/ViewProduct";

const DUMMY_ROWS = [
	{
		code: "PRD1",
		name: "PRODUCT 1",
		category: "CATEGORY 1",
		unit: "PCS",
		price: 10,
		cost: 20,
		quantity: 20,
		status: "ACTIVE",
	},
	{
		code: "PRD2",
		name: "PRODUCT 2",
		category: "CATEGORY 2",
		unit: "PCS",
		price: 15,
		cost: 25,
		quantity: 25,
		status: "INACTIVE",
	},
	{
		code: "PRD3",
		name: "PRODUCT 3",
		category: "CATEGORY 3",
		unit: "PCS",
		price: 20,
		cost: 30,
		quantity: 30,
		status: "ACTIVE",
	},
];

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "name", label: "Name" },
	{ value: "category", label: "Category" },
	{ value: "code", label: "Code" },
	{ value: "quantity", label: "Quantity" },
];

const tableHeaders = [
	{ id: "code", label: "Product Code" },
	{ id: "name", label: "Product Name" },
	{ id: "category", label: "Category" },
	{ id: "quantity", label: "Current quantity" },
	{ id: "unit", label: "Unit" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE", "INACTIVE"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "View Inventory",
			icon: (
				<AssignmentTurnedInIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const viewInventoryModal = {
	operation: "view",
	top: 20,
	left: 200,
	width: 1000,
	title: "View Product",
	icon: (
		<AssignmentTurnedInIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Inventory = () => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(viewInventoryModal);

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

	const handleModalConfig = (passedModalConfig) => {
		if (passedModalConfig.operation) {
			setModalConfig(passedModalConfig);
			setOpenModal(true);
		} else {
			setOpenModal(false);
		}
	};

	const inventoryBody = () => {
		switch (modalConfig.operation) {
			case "view":
				return <ViewProduct />;
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
				{inventoryBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Inventory" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
				<ListingTable
					headers={tableHeaders}
					data={DUMMY_ROWS}
					limit={limit}
					page={page}
					availableMenu={optionMenu}
					onHandleLimit={handleLimit}
					onHandlePage={handlePage}
					onHandleModalConfig={handleModalConfig}
				/>
			</Container>
		</>
	);
};

export default Inventory;
