import React, { useState } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import BlockIcon from "@material-ui/icons/Block";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import BlacklistCustomer from "../components/customers/BlacklistCustomer";
import CreateCustomer from "../components/customers/CreateCustomer";
import DeleteCustomer from "../components/customers/DeleteCustomer";
import EditCustomer from "../components/customers/EditCustomer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ReverseBlacklistCustomer from "../components/customers/ReverseBlacklistCustomer";
import ViewCustomer from "../components/customers/ViewCustomer";

const DUMMY_ROWS = [
	{
		customerNo: "CRM202202-0001",
		lastName: "TEST1",
		firstName: "TEST1L",
		middleInitial: "A",
		status: "ACTIVE",
	},
];

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "customerno", label: "Customer Number" },
	{ value: "lastname", label: "Lastname" },
	{ value: "firstname", label: "Firstname" },
	{ value: "isblacklisted", label: "Status" },
];

const tableHeaders = [
	{ id: "avatar", label: "Avatar" },
	{ id: "customerNo", label: "Customer Number" },
	{ id: "lastName", label: "Last Name", minWidth: 120 },
	{ id: "firstName", label: "First Name", minWidth: 150 },
	{ id: "middleInitial", label: "Middle Initial" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "View Customer",
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
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 20,
			left: 310,
			width: 750,
			title: "Edit Customer",
			icon: (
				<EditIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "blacklist",
		label: "Blacklist customer",
		activateIn: ["ACTIVE"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Blacklist Customer",
			icon: (
				<BlockIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "reverseBlacklist",
		label: "Reverse blacklist customer",
		activateIn: ["BLACKLISTED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Reverse Blacklist Customer",
			icon: (
				<AddCircleIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "delete",
		label: "Delete",
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Delete Customer",
			icon: (
				<DeleteIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createCustomerModal = {
	operation: "add",
	top: 20,
	left: 310,
	width: 750,
	title: "Add Customer",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Customers = () => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createCustomerModal);

	const handleFilter = (filters) => {
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

	const handleAddCustomer = (newCustomer) => {
		DUMMY_ROWS.push(newCustomer);
		console.log(newCustomer);
		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createCustomerModal);
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

	const customerBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateCustomer onSave={handleAddCustomer} />;
			case "view":
				return <ViewCustomer />;
			case "edit":
				return <EditCustomer />;
			case "blacklist":
				return <BlacklistCustomer onCancel={handleCloseModal} />;
			case "reverseBlacklist":
				return <ReverseBlacklistCustomer onCancel={handleCloseModal} />;
			case "delete":
				return <DeleteCustomer onCancel={handleCloseModal} />;
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
				{customerBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Customers" />
				<FilterForm
					sort={sortFields}
					isBlacklisted
					onHandleFilters={handleFilter}
				/>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Customer
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

export default Customers;
